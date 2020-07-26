import axios from 'axios';
import cheerio from 'cheerio';
import compareUrls from 'compare-urls';
import normalizeUrl  from 'normalize-url';
import mongoose from '../../server/mongoose';

const linkSchema = new mongoose.Schema(
  {
    url: String,
    tags: Array,
  }
);

linkSchema.methods.show = () => {
  const linkSchema = `${this.url} ${this.tags}`
}

linkSchema.statics.fetchUrlData = async url => {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

linkSchema.statics.filterWords = text => {
  let regExp = /[a-zA-Z]+/g;
  var matches = text.match(regExp).filter(word => word.length > 4);
  const words = matches.map(word => word.toLowerCase());
  return words;
}

linkSchema.statics.analyzeTags = tags => {
  const regExp = /[\s,]+/;
  const splitTags = tags.split(regExp);
  return splitTags;
}

linkSchema.statics.analyzeUrl = async function(url) {
  const normalizedUrl = normalizeUrl(url);
  const linkData = await this.findOne({ url: normalizedUrl });
  let isSameUrl = false;
  if (linkData?.url) {
    isSameUrl = compareUrls(linkData.url, normalizedUrl);    
  }
  return [linkData, normalizedUrl, isSameUrl];
}

linkSchema.statics.getTags = words => {
  const counts = words.reduce((acc, value) => ({
    ...acc,
    [value]: (acc[value] || 0) + 1
  }), {});
  const tags = [];
  for (let tag in counts) {
    tags.push({ [tag]: counts[tag] });
  };
  tags.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
  const mostPopularTags = [];
  for (let index = 0; index < 10; index++) {
    if (tags.length >= index) mostPopularTags.push(tags[index]);
  }
  if (mostPopularTags.length === 0) {
    if (tags.length > 0) {
      mostPopularTags.push(tags[0])
    } else {
      mostPopularTags.push({ none: 'none' });
    }
  }
  return mostPopularTags;
}

linkSchema.statics.getOrCreateLink = async function ({ url, tags }) {
  const $ = await this.fetchUrlData(url);
  const pageText = $('body').text();
  
  const [existingLink, normalizedUrl, isExistingUrl] = await this.analyzeUrl(url);
  const standardizedTags = this.analyzeTags(tags);

  if (existingLink) {
    existingLink.tags = [...existingLink.tags, ...standardizedTags];
    await existingLink.save();
    return existingLink;
  }

  const words = this.filterWords(pageText);
  const popularTags = this.getTags(words);

  standardizedTags.forEach(tag => {
    popularTags.push({ [tag]: tag });    
  });
  const tagsList = popularTags.map(tag => Object.keys(tag)[0]);

  const link = await this.create({ url: normalizedUrl, tags: tagsList });
  return link;
}

const Link = mongoose.model('Link', linkSchema);

export default Link;