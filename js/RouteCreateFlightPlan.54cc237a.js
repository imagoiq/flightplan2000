(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["RouteCreateFlightPlan"],{1658:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("map-viewer",{ref:"createMap",staticClass:"h-full w-full",attrs:{editable:!0,"save-location-on-move":!0},on:{"restart-draw":t.createPolyline}})},n=[],s=a("ad88"),l=a("a5c1"),o={components:{MapViewer:l["a"]},mixins:[s["a"]],mounted(){this.map=this.$refs.createMap.map,this.createPolyline()}},r=o,c=a("2877"),d=Object(c["a"])(r,i,n,!1,null,null,null);e["default"]=d.exports},ad88:function(t,e,a){"use strict";var i=a("e11e"),n=a("2f62");e["a"]={data:()=>({currentId:null}),beforeDestroy(){this.map.editTools.off("editable:editing")},methods:{editPolyline(t){const e=new i["polyline"](t.points);e.addTo(this.map),e.enableEdit();const a=i["latLngBounds"](t.points);this.map.fitBounds(a,{animate:!1,padding:[15,15]}),this.saveAutoPolyline(e)},createPolyline(){const t=this.map.editTools.startPolyline();this.saveAutoPolyline(t)},saveAutoPolyline(t){this.map.editTools.on("editable:editing",async()=>{null===this.currentId&&(this.currentId=await this.createFlightPlan());const e=t.getLatLngs().map(t=>[t.lat,t.lng]);this.savePoints({id:this.currentId,points:e})})},...Object(n["b"])("flightPlans",["createFlightPlan","savePoints"])}}}}]);
//# sourceMappingURL=RouteCreateFlightPlan.54cc237a.js.map