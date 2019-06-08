/**
 * Index article list top page generator
 */
var pagination = require("hexo-pagination");
module.exports = function(hexo) {
  hexo.extend.generator.register("index", function(locals) {
    var config = this.config;
    // var posts = locals.posts.sort(config.index_generator.order_by);
    locals.posts.forEach(function(item) {
      if (!item.top) {
        item.top = 0;
      }
    });
    var posts = locals.posts.sort("-top " + config.index_generator.order_by);
    // var posts = locals.posts.sort({ top: -1 , date: -1 });

    var paginationDir = config.pagination_dir || "page";
    var path = config.index_generator.path || "";
    return pagination(path, posts, {
      perPage: config.index_generator.per_page,
      layout: ["index", "archive"],
      format: paginationDir + "/%d/",
      data: {
        __index: true
      }
    });
  });
};
