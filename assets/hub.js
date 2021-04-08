hub_action = '/lander/hub/hub_order.php';


//document.addEventListener("DOMContentLoaded", function() {
  var fingerprintjs = document.createElement('script');
  fingerprintjs.src = '../../lander/hub/fingerprint.js';
  fingerprintjs.onload = function () {

    ohfp = new Fingerprint().get();
    /*
    var newLi = document.createElement('b');
    newLi.innerHTML = 'Ident: '+ohfp;
    document.body.appendChild(newLi);
    */

    var cnt = document.forms.length;
    var hub_script_attrs = document.getElementById('hub_script').attributes;
    var hub_data = {'ohmega': {}, 'get': null, 'ident': null};

    if(ohmega.data) hub_data.ohmega = ohmega;

    hub_data.ohmega.land_link = window.location.origin+window.location.pathname;
    hub_data.ident = ohfp;
    hub_data.get = getAllUrlParams();

    for(i = 0; i < cnt; i++){
      if( document.forms[i].hasAttribute('hub_form')) {
        document.forms[i].setAttribute('action', hub_action);
        document.forms[i].setAttribute('method', 'POST');

        var input = document.createElement("input");
        input.type = "hidden";
        input.name = "hub_data";
        input.value = JSON.stringify(hub_data);
        document.forms[i].appendChild(input);
      }
    }
  };
  document.head.appendChild(fingerprintjs);




  document.cookie = "pixel="+getAllUrlParams()['pixel'];
//});

function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
    for (var i=0; i<arr.length; i++) {
      var a = arr[i].split('=');
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();
      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') obj[paramName] = [obj[paramName]];
        if (typeof paramNum === 'undefined') obj[paramName].push(paramValue);
        else obj[paramName][paramNum] = paramValue;
      }
      else obj[paramName] = paramValue;
    }
  }
  return obj;
}
