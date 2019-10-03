class PresetsData {
    constructor(presets) {
      this.presetsData = PresetsData.constructData(presets);
    }
  
    static constructData(data) {
      try {
          var newFormat = null;
        var jsonData = {};


          var mainAttributes = Object.keys(data.presetsData);
          mainAttributes.forEach(
             function(mainAttribute) 
             {
                 var attrKey = mainAttribute.keys;
                 jsonData[attrKey] = mainAttribute.value;
             }
          );
newFormat.push(jsonData);
          var subAttributes = Object.values(data.presetsData);
         
        return subAttributes;
       
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = PresetsData;
  