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