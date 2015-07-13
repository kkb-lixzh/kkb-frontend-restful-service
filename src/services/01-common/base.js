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