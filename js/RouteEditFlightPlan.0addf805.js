(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["RouteEditFlightPlan"],{ad88:function(t,i,e){"use strict";var n=e("e11e"),a=e("2f62");i["a"]={data:()=>({currentId:null}),beforeDestroy(){this.map.editTools.off("editable:editing")},methods:{editPolyline(t){const i=new n["polyline"](t.points);i.addTo(this.map),i.enableEdit();const e=n["latLngBounds"](t.points);this.map.fitBounds(e,{animate:!1,padding:[15,15]}),this.saveAutoPolyline(i)},createPolyline(){const t=this.map.editTools.startPolyline();this.saveAutoPolyline(t)},saveAutoPolyline(t){this.map.editTools.on("editable:editing",async()=>{null===this.currentId&&(this.currentId=await this.createFlightPlan());const i=t.getLatLngs().map(t=>[t.lat,t.lng]);this.savePoints({id:this.currentId,points:i})})},...Object(a["b"])("flightPlans",["createFlightPlan","savePoints"])}}},af77:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("map-viewer",{ref:"editMap",staticClass:"h-full w-full",attrs:{editable:!0,"save-location-on-move":!0},on:{"restart-draw":t.createPolyline}})},a=[],l=e("2f62"),s=e("ad88"),o=e("a5c1"),d={components:{MapViewer:o["a"]},mixins:[s["a"]],computed:{...Object(l["d"])("flightPlans",["list"])},mounted(){var t;this.map=this.$refs.editMap.map;const i=parseInt(null===(t=this.$route.params)||void 0===t?void 0:t.flightPlanId,10),e=this.list.find(t=>t.id===i),n=null===e||void 0===e?void 0:e.points.length;if(!e)throw"No flight plan found with this id";(null===e||void 0===e?void 0:e.id)&&(this.currentId=e.id),n>0&&this.editPolyline(e),0===n&&this.createPolyline()}},r=d,h=e("2877"),c=Object(h["a"])(r,n,a,!1,null,null,null);i["default"]=c.exports}}]);
//# sourceMappingURL=RouteEditFlightPlan.0addf805.js.map