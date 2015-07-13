/**
 * Created by lixzh on 7/3/15.
 */
kkb.restful.courses.CommentService=function($resource,$cookies){

    var $base = this;
    ///构造函数
    this.super.constructor.call(this, "CommentService",$resource,$cookies);

    var getClassCommentResource=function(courseId,commentId){
        return $base.getResource("/courses/:courseId/evaluations/:evaluationId/", {courseId:courseId || "@courseId",evaluationId:commentId || "@evaluationId"});
    }

    var getEditCommentResource=function(commentId){
        return $base.getResource("/evaluations/:evaluationId/", {evaluationId:commentId || "@evaluationId"});
    }

    this.get=function(commentId){

    }

    this.update=function(commentObject){
        return this.getSO().update(getEditCommentResource(commentObject.getCommentId()),commentObject.getPostCommentObject());
    }

    this.remove=function(commentId){

    }

    this.create=function(commentObject){
        return this.getSO().create(getClassCommentResource(commentObject.getCourseId()),commentObject.getPostCommentObject());
    }

    this.query=function(courseId){
        return this.getSO().get(getClassCommentResource(),{courseId:courseId,pageSize:10000});
    }

    this.upComment=function(commentObject){
        return this.getSO().update(getEditCommentResource(commentObject.getCommentId()),commentObject.getUsefulReplyObject());
    }

    this.downComment=function(commentObject){
        return this.getSO().update(getEditCommentResource(commentObject.getCommentId()),commentObject.getUselessReplyObject());
    }
}

extend(kkb.restful.RESTfulBase,kkb.restful.courses.CommentService)