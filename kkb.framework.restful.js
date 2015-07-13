(function($w) {
    var kkb = kkb || {};
    kkb.restful = kkb.restful || {};
    kkb.restful.courses = {};
    kkb.restful.classes = {};
    kkb.restful.categories = {};
    kkb.models = {};
    kkb.models.courseModels = {};
    $w.kkb = kkb;
})(window);

var appModule = angular.module('kkb-restful-app', ['ngResource', 'ngCookies']);

appModule.service('restful-course-comment', ['$resource', '$cookies', function($resource, $cookies) {
    return new kkb.restful.courses.CommentService($resource, $cookies);
}]);


appModule.controller('CommentServiceCtrl', ['$scope', 'restful-course-comment', function($scope, commentService) {
    $scope.text = 'Hello World!';
}]);
/**
 * Created by lixzh on 6/26/15.
 */

kkb.models.common=kkb.models.common || {};

///用户的配置文件
kkb.models.common.Profile=function(tenantId,userName,loginName, webApiUrl, access_token,tenant_id){
    var tenantId=tenantId||null;
    var userName=userName||null;
    var loginName=loginName||null;

    var webApiUrl = webApiUrl || null;
    var accessToken = access_token || null;
    var tenantId = tenant_id || null;

    this.getTenantId=function(){return tenantId;}
    this.getUserName=function(){return userName;}
    this.getLoginName=function(){return loginName;}
    this.getWebApiUrl=function(){return webApiUrl;}
    this.getAccessToken=function(){return accessToken;}
    this.getTenantId=function(){return tenantId;}
}
/**
 * Created by lixzh on 15/6/17.
 */

///model的基类
kkb.models.base=function(modelName) {
    var _modelName=modelName
    this.getModelName=function(){
        return _modelName||"kkb.models.base";
    }
}

kkb.models.common=kkb.models.common || {};
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

/**
 * Created by lixzh on 7/3/15.
 */

kkb.restful.RESTfulBase=function(serviceName,$resource,$cookies){

    var userProfile=null;

    this.serviceName=serviceName;

    var getResource=function(){return $resource;}

    var getBaseUrl=function(){
         return "http://release-api.kaikeba.cn";
        //return window.settings.webApiUrl
    }

    this.resloveUrl=function(path){
        return this.getWebApiUrl()+path;
    }

    this.getResource=function(url,parameter){
        var source=getResource()(this.resloveUrl(url),parameter, {
            'get': {'method': 'GET'},
            'update': {'method': 'PUT'},
            'create': {method: 'POST'},
            'query': {method: 'GET', isArray: true},
            'remove': {method: 'DELETE'}
        });
        source.getUrl=function(){
            return url;
        }
        source.getParameter=function(){
            return parameter;
        }
        return source;
    }

    var getUserProfile=function(){
        if(!userProfile) {
            userProfile = new kkb.models.common.Profile(
                "",
                "",
                "",
                getBaseUrl(),
                "9f6cb6ef7d83d59ddc550e6d1b5c49b6",//$cookies.get("access_token"),
                8//$cookies.get("tenant_id")
            );
        }
        return userProfile;
    }

    this.getWebApiUrl=function(){
        return getUserProfile().getWebApiUrl();
    }

    this.getAccessToken=function(){
        return getUserProfile().getAccessToken();
    }

    this.getTenantId=function(){
        return getUserProfile().getTenantId();
    }
};

kkb.restful.RESTfulBase.prototype.getServiceName=function(){
    return this.serviceName;
};

//getSO=>getServerObject
kkb.restful.RESTfulBase.prototype.getSO=function() {
    var $that=this;
    var getParameter=function(parameter){
        delete(parameter.super);
        return parameter;
        //return $.extend({},(parameter || {}),{access_token:$that.getAccessToken()})
    }
    var getPostResource=function(resourceObject){
        return $that.getResource(resourceObject.getUrl()+"?access_token="+$that.getAccessToken(),resourceObject.getParameter())
    }
    return {
        get:function(resourceObject,parameter){
            return getPostResource(resourceObject).get(getParameter(parameter)).$promise;
        },

        update:function(resourceObject,parameter){
            return getPostResource(resourceObject).update(getParameter(parameter)).$promise;
        },

        create:function(resourceObject,parameter) {
            return getPostResource(resourceObject).save(getParameter(parameter)).$promise;
        },

        query:function(resourceObject,parameter){
            return getPostResource(resourceObject).query(getParameter(parameter)).$promise;
        },

        remove:function(resourceObject,parameter){
            return getPostResource(resourceObject).remove(getParameter(parameter)).$promise;
        }
    }
};
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
/**
 * Created by lixzh on 7/3/15.
 */

/**
 * Created by lixzh on 7/3/15.
 */

/**
 * Created by lixzh on 7/3/15.
 */

///此类是classes web api的crud功能

kkb.restful.classes.main=function(){
    this.queryClasses=function(){

    }

    this.getClasses=function(classId){

    }
}
/**
 * Created by lixzh on 7/3/15.
 */

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