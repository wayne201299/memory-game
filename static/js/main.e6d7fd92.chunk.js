(this["webpackJsonpmemory-game"]=this["webpackJsonpmemory-game"]||[]).push([[0],{14:function(t,e,r){},8:function(t,e,r){"use strict";r.r(e);var a=r(3),n=r(4),s=r(6),l=r(5),c=r(0),i=r(1),o=r.n(i),u=r(7),h=r.n(u),p=(r(14),["1","2","3","4","5","6","7","8"]),d=function(t){Object(s.a)(r,t);var e=Object(l.a)(r);function r(){return Object(a.a)(this,r),e.apply(this,arguments)}return Object(n.a)(r,[{key:"render",value:function(){return Object(c.jsx)("div",{className:"card",onClick:this.props.onClick,children:this.props.value})}}]),r}(o.a.Component),f=function(t){Object(s.a)(r,t);var e=Object(l.a)(r);function r(t){var n;return Object(a.a)(this,r),(n=e.call(this,t)).state={fstVal:null,secVal:null,pre_pos:null,cardArray:j(p.concat(p)),flipArray:Array(16).fill(!1)},n}return Object(n.a)(r,[{key:"renderCard",value:function(t,e){var r=this,a="Back";return this.state.flipArray[e]&&(a=t),Object(c.jsx)(d,{value:a,onClick:function(){return r.handleClick(e)}})}},{key:"handleClick",value:function(t){var e=this.state.flipArray.slice(),r=this.state.fstVal,a=this.state.secVal,n=this.state.pre_pos,s=this.state.cardArray[t];console.log(e),e[t]||(e[t]=!0,r?(r===(a=s)?alert("Match!"):(alert("FAIL!"),e[this.state.pre_pos]=!1,e[t]=!1),n=null,r=null,a=null):(r=s,n=t),this.setState({fstVal:r,secVal:a,pre_pos:n,cardArray:this.state.cardArray,flipArray:e}))}},{key:"render",value:function(){var t=this;return Object(c.jsxs)("div",{className:"game",children:[Object(c.jsx)("h1",{children:"MemoryGame"},"title"),Object(c.jsx)("div",{className:"grid-container",children:this.state.cardArray.map((function(e,r){return t.renderCard(e,r)}))}),Object(c.jsx)("button",{className:"reset",onClick:function(){t.setState({fstVal:null,secVal:null,pre_pos:null,cardArray:j(p.concat(p)),flipArray:Array(16).fill(!1)})},children:"Reset"})]})}}]),r}(o.a.Component);function j(t){for(var e=t,r=e.length-1;r>0;r--){var a=Math.floor(Math.random()*(r+1)),n=[e[a],e[r]];e[r]=n[0],e[a]=n[1]}return e}h.a.render(Object(c.jsx)(f,{}),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.e6d7fd92.chunk.js.map