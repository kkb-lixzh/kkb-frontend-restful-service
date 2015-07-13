/**
 * Created by lixzh on 7/3/15.
 */
kkb.restful.categories.CategoryService=function($resource,$cookies){

    var $base = this;
    ///构造函数
    this.super.constructor.call(this, "CategoryService",$resource,$cookies);

    var getCategoryResource=function(categoryId){
        return $base.getResource("/categories/:categoryId/", {categoryId:categoryId || "@categoryId"});
    }

    this.get=function(categoryId){
        return this.getSO().get(getCategoryResource(categoryId),{});
    }

    this.update=function(commentObject){
    }

    this.remove=function(commentId){

    }

    this.create=function(commentObject){
    }

    this.query=function(courseId){
    }
}

extend(kkb.restful.RESTfulBase,kkb.restful.categories.CategoryService)