(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a2b302ee"],{"4e1e":function(t,e,s){},"64f9":function(t,e,s){"use strict";s("98e3")},7303:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"adminLeft"}},[a("img",{staticClass:"logo",attrs:{src:s("cfe5")}}),a("nav",{staticClass:"nav"},[a("router-link",{attrs:{to:"/admin_main/"}},[t._v("All Tweets")]),a("router-link",{attrs:{to:"/admin_user/"}},[t._v("Users")])],1),a("div",{staticClass:"logout",on:{click:t.logout}},[a("img",{attrs:{src:s("2e6e")}}),a("span",[t._v("Log out")])])])},i=[],n=s("2f62"),r={computed:{...Object(n["b"])(["currentUser","isAuthenticated"])},methods:{logout(){this.$store.commit("revokeAuthentication"),this.$router.push("/admin")}}},c=r,o=(s("7512"),s("2877")),l=Object(o["a"])(c,a,i,!1,null,null,null);e["a"]=l.exports},7512:function(t,e,s){"use strict";s("c1a1")},"8db8":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"adminframe"},[s("adminLeft"),s("adminRightTweets")],1)},i=[],n=s("7303"),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"adminRIghtTweets"}},[s("h3",{staticClass:"title"},[t._v("All Tweets")]),t.isLoading?s("Spinner"):t._e(),s("div",{staticClass:"box"},t._l(t.tweets,(function(e){return s("div",{key:e.id,staticClass:"cards"},[s("div",{staticClass:"left"},[s("img",{staticClass:"avatar",attrs:{src:t._f("emptyImage")(e.User.avatar),alt:"tweet.avatar"}})]),s("div",{staticClass:"right"},[s("h5",{staticClass:"info"},[t._v(t._s(e.User.name)+" "),s("span",[t._v("@"+t._s(e.User.account)+"·"+t._s(t._f("fromNow")(e.createdAt)))])]),s("p",{staticClass:"article"},[t._v(t._s(e.description))]),s("div",{staticClass:"delete",on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.deleteTweet(e.id)}}},[t._v("×")])])])})),0)],1)},c=[],o=s("2708"),l=s("be6c"),u=s("2fa3"),d=s("9348"),f={mixins:[o["a"],o["c"]],components:{Spinner:d["a"]},data(){return{tweets:[],isLoading:!0}},created(){this.fetchTweets()},methods:{async fetchTweets(){try{this.isLoading=!0;const t=await l["a"].tweets.get();if("error"===t.status)throw new Error(t.message);this.tweets=t.data,this.isLoading=!1}catch(t){this.isLoading=!1,u["a"].fire({icon:"error",title:"Cannot get tweets. Please wait for a moment"}),console.error(t.message)}},async deleteTweet(t){try{const e=await l["a"].tweets.delete({tweetId:t});if("error"===e.status)throw new Error(e.message);this.tweets=this.tweets.filter(e=>e.id!==t),u["a"].fire({icon:"success",title:"Tweet deleted successfully"}),this.fetchTweets()}catch(e){u["a"].fire({icon:"error",title:"Cannot delete this tweet. Please wait for a moment"}),console.error(e.message)}}}},m=f,w=(s("64f9"),s("2877")),h=Object(w["a"])(m,r,c,!1,null,null,null),v=h.exports,g={components:{adminLeft:n["a"],adminRightTweets:v}},_=g,p=(s("e315"),Object(w["a"])(_,a,i,!1,null,null,null));e["default"]=p.exports},"98e3":function(t,e,s){},c1a1:function(t,e,s){},e315:function(t,e,s){"use strict";s("4e1e")}}]);
//# sourceMappingURL=chunk-a2b302ee.15bafcad.js.map