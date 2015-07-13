/**
 * Created by lixzh on 7/6/15.
 */
kkb.restful.courses.CommentReplyService=function($resource,$cookies){

    var $base = this;
    ///构造函数
    this.super.constructor.call(this, "CommentReplyService",$resource,$cookies);

    var getReplyCommentResource=function(commentId){
        return $base.getResource("/evaluations/:evaluationId/comments", {evaluationId:commentId || "@evaluationId"});
    }

    this.get=function(commentId){

    }

    this.update=function(commentObject){
        return this.getSO().update(getEditCommentResource(commentObject.getCommentId()),commentObject.getPostCommentObject());
    }

    this.remove=function(commentId){

    }

    this.create=function(commentObject){
        return this.getSO().create(getReplyCommentResource(commentObject.getCommentId()),commentObject.getCommentReplyObject());
    }

    this.query=function(courseId){
        return this.getSO().get(getClassCommentResource(),{courseId:courseId});
    }
}

extend(kkb.restful.RESTfulBase,kkb.restful.courses.CommentReplyService)