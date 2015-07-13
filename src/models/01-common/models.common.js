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