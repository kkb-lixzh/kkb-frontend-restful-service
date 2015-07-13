/**
 * Created by lixzh on 7/3/15.
 */

///课程评价模型

///@content=>评论内容
///@rating=>评价分数
///@status=>评论状态
///@courseId=>课程id
///@evaluationId=>评价id,新增评价时，该值为null，反之为服务端回值的值
kkb.models.courseModels.EvaluationModel=function(content,rating,status,courseId,evaluationId,useful){

    this.super.constructor.call(this, "kkb.models.courseModels.EvaluationModel");

    if(isNaN( parseInt(rating||0))){rating=0;}

    this.content=content||"";
    this.rating=parseInt(rating||0);
    this.status=status||"active";
    this.courseId=courseId||null;
    this.evaluationId=evaluationId||null;
    this.useful=!!useful;
    this.useless=!useful;

    this.isNewComment=function(){
        return !this.evaluationId;
    }

    this.getPostCommentObject=function(){
        return {content:this.content,rating:this.rating,status:this.status};
    }

    this.getCommentReplyObject=function(){
        return {content:this.content,status:"active"};
    }

    this.getUsefulReplyObject=function(){
        return {useful:1};
    }

    this.getUselessReplyObject=function(){
        return {useless:1};
    }

    this.getCourseId=function(){
        return this.courseId;
    }

    this.getCommentId=function(){
        return this.evaluationId;
    }
}

extend(kkb.models.base,kkb.models.courseModels.EvaluationModel);
