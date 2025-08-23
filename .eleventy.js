module.exports = function(eleventyConfig) {
  // Zkopírovat obrázky
  eleventyConfig.addPassthroughCopy("images");

  // Zkopírovat CSS
  eleventyConfig.addPassthroughCopy("css");

  // Zkopírovat JS
  eleventyConfig.addPassthroughCopy("js");

  // Vrácení nastavení šablon
  return {
    templateFormats: ["njk", "html", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
