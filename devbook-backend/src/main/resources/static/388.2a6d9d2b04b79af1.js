"use strict";(self.webpackChunkdevbook_frontend=self.webpackChunkdevbook_frontend||[]).push([[388],{5388:(B,h,s)=>{s.r(h),s.d(h,{ProfileModule:()=>R});var d=s(1390),c=s(4665),t=s(4650),f=s(9082),g=s(6895),_=s(7705);function b(o,n){1&o&&t._UZ(0,"map-marker",2),2&o&&t.Q6J("position",n.$implicit.getPosition())}let Z=(()=>{class o{constructor(e){this.sharedSvc=e}ngOnDestroy(){this.sharedSvc.searchLocation=""}ngOnInit(){this.searchLocation=this.sharedSvc.searchLocation,this.markers=new Array,(new google.maps.Geocoder).geocode({address:this.searchLocation},(i,r)=>{r==google.maps.GeocoderStatus.OK?(console.info("location geocoded"),this.center={lat:i[0].geometry.location.lat(),lng:i[0].geometry.location.lng()},i?.forEach(a=>{let u={lat:a.geometry.location.lat(),lng:a.geometry.location.lng()},m=new google.maps.Marker;m.setPosition(u),this.markers.push(m)})):console.error("couldnt geocode location")})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(f.F))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-google"]],decls:2,vars:2,consts:[["height","50vh","width","50vw",3,"center"],[3,"position",4,"ngFor","ngForOf"],[3,"position"]],template:function(e,i){1&e&&(t.TgZ(0,"google-map",0),t.YNc(1,b,1,1,"map-marker",1),t.qZA()),2&e&&(t.Q6J("center",i.center),t.xp6(1),t.Q6J("ngForOf",i.markers))},dependencies:[g.sg,_.b6,_.O_]}),o})();var T=s(1458),l=s(4006),k=s(7009),p=s(1366),C=s(5412),U=s(7392),A=s(4859),y=s(1572),v=s(3513);function P(o,n){1&o&&(t.TgZ(0,"div",7),t._UZ(1,"mat-progress-spinner",8),t.qZA()),2&o&&(t.xp6(1),t.Q6J("mode","indeterminate"))}const w=function(o){return["/user",o,"edit"]};function L(o,n){if(1&o&&(t.TgZ(0,"mat-icon",23),t._uU(1,"edit"),t.qZA()),2&o){const e=t.oxw(2);t.Q6J("routerLink",t.VKq(1,w,e.user.id))}}function I(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"div",9),t.YNc(1,L,2,3,"mat-icon",10),t.TgZ(2,"table",11)(3,"tbody")(4,"tr")(5,"td",12),t._UZ(6,"img",13),t.qZA()(),t.TgZ(7,"tr")(8,"td",14)(9,"ngx-material-rating",15),t.NdJ("ngModelChange",function(r){t.CHM(e);const a=t.oxw();return t.KtG(a.ratingValue=r)})("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.ratePressed())}),t.qZA()()(),t.TgZ(10,"tr")(11,"td",16),t._uU(12),t.qZA(),t.TgZ(13,"td",17)(14,"mat-icon",18),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.likePressed())}),t._uU(15,"thumb_up"),t.qZA()()(),t.TgZ(16,"tr")(17,"td",19),t._UZ(18,"img",20),t.TgZ(19,"p",21),t._uU(20),t.qZA(),t._UZ(21,"img",22),t.qZA()()()()()}if(2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.sameUser),t.xp6(5),t.Q6J("src","https://bigbook.sgp1.digitaloceanspaces.com/users/"+e.user.id+"/profilephoto.jpg",t.LSH),t.xp6(3),t.Q6J("dense",!0)("max",5)("color","accent")("ngModel",e.ratingValue),t.xp6(3),t.hij(" ",e.user.likes," "),t.xp6(8),t.Oqu(e.user.bio)}}function O(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"div",24)(1,"table",11)(2,"tbody")(3,"tr")(4,"td",25),t._uU(5),t.TgZ(6,"button",26),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.openOutlook())}),t.TgZ(7,"mat-icon",27),t._uU(8,"email"),t.qZA()()()(),t.TgZ(9,"tr")(10,"td",28),t._uU(11),t.TgZ(12,"button",29)(13,"mat-icon",30),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.openMaps(r.user.currentCompany))}),t._uU(14,"place"),t.qZA()()()(),t.TgZ(15,"tr")(16,"td",31)(17,"p",32),t._uU(18,"Current"),t.qZA()(),t.TgZ(19,"td")(20,"p",33),t._uU(21),t.qZA()()(),t.TgZ(22,"tr")(23,"td",34)(24,"p",32),t._uU(25,"Previous"),t.qZA()(),t.TgZ(26,"td")(27,"p",33),t._uU(28),t.qZA()()(),t.TgZ(29,"tr")(30,"td",34)(31,"p",32),t._uU(32,"Education"),t.qZA()(),t.TgZ(33,"td")(34,"p",33),t._uU(35),t.qZA()()()()()()}if(2&o){const e=t.oxw();t.xp6(5),t.hij(" ",e.user.name," "),t.xp6(6),t.hij(" ",e.user.currentJob," "),t.xp6(1),t.Q6J("disabled",""==e.user.currentCompany),t.xp6(9),t.Oqu(e.user.currentCompany),t.xp6(7),t.Oqu(e.user.previousCompany),t.xp6(7),t.Oqu(e.user.education)}}function J(o,n){1&o&&(t.TgZ(0,"span"),t._uU(1,", "),t.qZA())}function N(o,n){if(1&o&&(t.TgZ(0,"div",38)(1,"a",39),t._uU(2),t.qZA(),t.YNc(3,J,2,0,"span",40),t.qZA()),2&o){const e=n.$implicit,i=n.index,r=t.oxw(2);t.xp6(1),t.Q6J("href",e.url,t.LSH),t.xp6(1),t.Oqu(e.name),t.xp6(1),t.Q6J("ngIf",i+1<r.user.websites.length)}}function M(o,n){if(1&o&&(t.TgZ(0,"div",24)(1,"table",11)(2,"tbody")(3,"tr")(4,"td",35),t._uU(5," Websites "),t.qZA()(),t.TgZ(6,"tr")(7,"td",36),t.YNc(8,N,4,3,"div",37),t.qZA()()()()()),2&o){const e=t.oxw();t.xp6(8),t.Q6J("ngForOf",e.user.websites)}}function q(o,n){if(1&o&&(t.TgZ(0,"tr")(1,"td",42)(2,"p",32),t._uU(3),t.qZA()(),t.TgZ(4,"td",43),t._UZ(5,"ngx-material-rating",44),t.qZA()()),2&o){const e=n.$implicit;t.xp6(3),t.Oqu(e.name),t.xp6(2),t.Q6J("dense",!0)("readonly",!0)("color","warn")("max",5)("value",e.rating)}}function F(o,n){if(1&o&&(t.TgZ(0,"div",24)(1,"table",11)(2,"tbody")(3,"tr")(4,"td",35),t._uU(5," Skills & Proficiency "),t.qZA()(),t.YNc(6,q,6,6,"tr",41),t.qZA()()()),2&o){const e=t.oxw();t.xp6(6),t.Q6J("ngForOf",e.user.skills)}}function S(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"div",47)(1,"img",48),t.NdJ("load",function(){t.CHM(e);const r=t.oxw(3);return t.KtG(r.imgLoaded())}),t.qZA()(),t.TgZ(2,"div",49)(3,"p"),t._uU(4),t.qZA()()}if(2&o){const e=t.oxw().$implicit,i=t.oxw(2);t.xp6(1),t.Q6J("src","https://bigbook.sgp1.digitaloceanspaces.com/users/"+i.user.id+"/"+e.name,t.LSH),t.xp6(3),t.Oqu(e.description)}}function Q(o,n){1&o&&t.YNc(0,S,5,2,"ng-template",46)}function Y(o,n){if(1&o&&(t.TgZ(0,"div",24)(1,"ngb-carousel",45),t.YNc(2,Q,1,0,null,41),t.qZA()()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("showNavigationArrows",!1)("showNavigationIndicators",!1),t.xp6(1),t.Q6J("ngForOf",e.user.images)}}function G(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"table",11)(1,"tbody")(2,"tr")(3,"td")(4,"p",51),t._uU(5,"Please "),t.TgZ(6,"span",52),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.routeToLogin())}),t._uU(7,"login"),t.qZA(),t._uU(8," to comment"),t.qZA()()()()()}}function E(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"table",11)(1,"tbody")(2,"tr")(3,"td")(4,"textarea",53,54),t.NdJ("ngModelChange",function(r){t.CHM(e);const a=t.oxw(2);return t.KtG(a.textAreaInput=r)}),t.qZA()()(),t.TgZ(6,"tr")(7,"td")(8,"button",55),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.addComment())}),t.TgZ(9,"mat-icon"),t._uU(10,"rate_review"),t.qZA()()()()()()}if(2&o){const e=t.MAs(5),i=t.oxw(2);t.xp6(4),t.Q6J("ngModel",i.textAreaInput),t.xp6(4),t.Q6J("disabled",!(e.value.length>0))}}function H(o,n){if(1&o&&(t.TgZ(0,"div",24),t.YNc(1,G,9,0,"table",50),t.YNc(2,E,11,2,"table",50),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",!e.currentUser),t.xp6(1),t.Q6J("ngIf",e.currentUser)}}function D(o,n){if(1&o&&(t.TgZ(0,"div",57),t._UZ(1,"img",58),t.TgZ(2,"div",59),t._uU(3),t.TgZ(4,"p",60),t._uU(5),t.qZA(),t._UZ(6,"p"),t.qZA()()),2&o){const e=n.$implicit;t.xp6(1),t.Q6J("src","https://bigbook.sgp1.digitaloceanspaces.com/users/"+e.id+"/profilephoto.jpg",t.LSH),t.xp6(2),t.hij(" ",e.name," "),t.xp6(2),t.hij(" ",e.text," ")}}function j(o,n){if(1&o&&(t.TgZ(0,"div",24),t.YNc(1,D,7,3,"div",56),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.user.comments)}}let K=(()=>{class o{constructor(e,i,r,a,u,m,x,$){this.router=e,this.backendSvc=i,this.activatedRoute=r,this.sharedSvc=a,this.fb=u,this.snackbar=m,this.carouselConfig=x,this.dialog=$,this.ttlNoOfImgToLoad=0,this.ttlNoOfImgLoaded=0,this.textAreaInput="",this.sameUser=!1,this.loading=!0,this.pageLoading=!0,this.currentUserSub$=this.backendSvc.currentUser.subscribe(X=>this.currentUser=X),x.interval=4e3}ngOnDestroy(){this.currentUserSub$.unsubscribe()}ngOnInit(){this.userId=this.activatedRoute.snapshot.params.id,this.retrieveUserDetails(this.userId),this.formGrp=this.fb.group({email:this.fb.control(""),id:this.fb.control(""),comment_email:this.fb.control(""),name:this.fb.control(""),text:this.fb.control("")})}retrieveUserDetails(e){this.backendSvc.retrieveUserDetails(e).then(i=>{this.user=i,this.userComments=this.user.comments,this.ratingValue=this.user.ratings,this.pageLoading=!1,null!=this.currentUser&&(this.checkLikedOrRated(),this.currentUser.id==this.user.id&&(this.sameUser=!0)),this.user.images.forEach(r=>{this.ttlNoOfImgToLoad+=1}),0==this.ttlNoOfImgToLoad&&(this.ttlNoOfImgToLoad+=1,this.imgLoaded()),this.loading=!1}).catch(i=>{console.log(">>>> retrieve user details error: ",i)})}checkLikedOrRated(){this.backendSvc.checkIfLiked(this.user.email,this.currentUser.email).then(e=>{this.likedUser=e}).catch(e=>{}),this.backendSvc.checkIfRated(this.user.email,this.currentUser.email).then(e=>{this.ratedUser=e}).catch(e=>{})}likePressed(){if(this.loading=!0,null==this.currentUser)this.router.navigate(["/login"]);else if(this.likedUser){const e={userEmail:this.user.email,userLike:this.user.likes-1,currentUserEmail:this.currentUser.email};this.user.likes+=-1,this.likedUser=!1,this.backendSvc.liked(e).then(i=>{this.loading=!1,this.sharedSvc.displayMessage("UNLIKED","hotpink"),this.snackbar.openFromComponent(c.h,{duration:3e3,verticalPosition:"top"})}).catch(i=>{this.loading=!1})}else{const e={userEmail:this.user.email,userLike:this.user.likes+1,currentUserEmail:this.currentUser.email};this.user.likes+=1,this.likedUser=!0,this.backendSvc.liked(e).then(i=>{this.loading=!1,this.sharedSvc.displayMessage("LIKED","greenyellow"),this.snackbar.openFromComponent(c.h,{duration:3e3,verticalPosition:"top"})}).catch(i=>{this.loading=!1})}}ratePressed(){if(this.loading=!0,null==this.currentUser)this.router.navigate(["/login"]);else{const e={userEmail:this.user.email,currentUserEmail:this.currentUser.email,ratingGiven:this.ratingValue};this.sameUser?(this.loading=!1,this.sharedSvc.displayMessage("YOU_CAN'T_RATE_YOURSELF_SILLY","hotpink"),this.snackbar.openFromComponent(c.h,{duration:3e3,verticalPosition:"top"}),this.backendSvc.retrieveUserDetails(this.userId).then(i=>{this.ratingValue=this.user.ratings})):this.backendSvc.rated(e).then(i=>{this.ratingValue=i.data,this.loading=!1,this.sharedSvc.displayMessage("RATED","greenyellow"),this.snackbar.openFromComponent(c.h,{duration:3e3,verticalPosition:"top"})}).catch(i=>{this.loading=!1})}}addComment(){this.loading=!0,this.formGrp.controls.email.setValue(this.user.email),this.formGrp.controls.id.setValue(this.currentUser.id),this.formGrp.controls.comment_email.setValue(this.currentUser.email),this.formGrp.controls.name.setValue(this.currentUser.name),this.formGrp.controls.text.setValue(this.textAreaInput);const e=this.formGrp.value;this.userComments.push(e),this.backendSvc.insertComment(e).then(i=>{this.loading=!1,this.sharedSvc.displayMessage("COMMENT_ADDED","greenyellow"),this.snackbar.openFromComponent(c.h,{duration:3e3,verticalPosition:"top"})}).catch(i=>{this.loading=!1}),this.textAreaInput="",this.formGrp.reset()}openOutlook(){window.open(`mailto:${this.user.email}?subject=Hi ${this.user.name} from Devbook&body=I saw your profile on Devbook!`)}routeToLogin(){document.documentElement.scrollTop=0,this.router.navigate(["/login"])}imgLoaded(){this.ttlNoOfImgLoaded+=1,this.ttlNoOfImgToLoad==this.ttlNoOfImgLoaded&&(this.loading=!1,this.pageLoading=!1)}openMaps(e){0!=e.length&&(this.sharedSvc.searchLocation=this.user.currentCompany,this.dialog.open(Z))}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(d.F0),t.Y36(T.v),t.Y36(d.gz),t.Y36(f.F),t.Y36(l.qu),t.Y36(k.ux),t.Y36(p.Lu),t.Y36(C.uw))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-profile"]],decls:16,vars:8,consts:[["lang","en"],["charset","UTF-8"],["http-equiv","X-UA-Compatible","content","IE=edge"],["name","viewport","content","width=device-width, initial-scale=1.0"],["class","loading-spinner",4,"ngIf"],["class","border-margin-parent",4,"ngIf"],["class","border-margin-child",4,"ngIf"],[1,"loading-spinner"],["diameter","60","color","primary",2,"margin-left","auto","margin-right","auto",3,"mode"],[1,"border-margin-parent"],["class","edit-button",3,"routerLink",4,"ngIf"],[1,"table-properties"],["colspan","2",1,"portrait-properties"],["alt","Portrait",1,"portrait","rounded-circle",3,"src"],["colspan","2",2,"text-align","center"],[3,"dense","max","color","ngModel","ngModelChange","click"],["align","right",2,"width","50%","font-size","small"],["align","left",2,"width","50%"],[1,"thumbs-up-icon",3,"click"],["colspan","2"],["src","assets\\Images\\double-quotation-marks-open.png","alt","open quotation mark",1,"open-quotation"],[1,"caption"],["src","assets\\Images\\double-quotation-marks-close.png","alt","close quotation mark",1,"close-quotation"],[1,"edit-button",3,"routerLink"],[1,"border-margin-child"],["colspan","2",1,"name"],["mat-icon-button","","type","button",2,"vertical-align","middle",3,"click"],[1,"thumbs-up-icon"],["colspan","2",1,"title"],["mat-icon-button","","type","button",1,"thumbs-up-icon",2,"vertical-align","middle",3,"disabled"],[3,"click"],["align","right",2,"width","40%"],[1,"category"],[1,"cell-properties"],["align","right"],["colspan","2",1,"portfolio"],["colspan","2",1,"website"],["style","display: inline;",4,"ngFor","ngForOf"],[2,"display","inline"],[3,"href"],[4,"ngIf"],[4,"ngFor","ngForOf"],["align","right",2,"width","45%","padding-right","5px"],[2,"text-align","left"],[3,"dense","readonly","color","max","value"],[3,"showNavigationArrows","showNavigationIndicators"],["ngbSlide",""],[1,"picsum-img-wrapper","carousel-img"],[1,"img-in-carousel",3,"src","load"],[1,"carousel-caption"],["class","table-properties",4,"ngIf"],[2,"color","grey","font-size","smaller"],[2,"color","blue","text-decoration","underline","cursor","pointer",3,"click"],["placeholder","Add a comment","id","commentTextArea",3,"ngModel","ngModelChange"],["textAreaRef",""],["mat-mini-fab","","type","button","color","primary",2,"float","right","transform","scale(0.75)",3,"disabled","click"],["style","margin-bottom: 10px;",4,"ngFor","ngForOf"],[2,"margin-bottom","10px"],[1,"rounded-circle",2,"height","50px","width","50px","object-fit","cover","float","left","margin-right","3px",3,"src"],[2,"border","1px solid #cfd8dc","border-radius","5px","padding-left","5px","padding-right","5px","margin-left","55px","margin-bottom","5px","font-size","x-small","font-weight","bold","background-color","#cfd8dc"],[2,"font-size","small","font-weight","normal","max-width","inherit"]],template:function(e,i){1&e&&(t.TgZ(0,"html",0)(1,"head"),t._UZ(2,"meta",1)(3,"meta",2)(4,"meta",3),t.TgZ(5,"title"),t._uU(6,"Devbook"),t.qZA()(),t.TgZ(7,"body"),t.YNc(8,P,2,1,"div",4),t.YNc(9,I,22,8,"div",5),t.YNc(10,O,36,6,"div",6),t.YNc(11,M,9,1,"div",6),t.YNc(12,F,7,1,"div",6),t.YNc(13,Y,3,3,"div",6),t.YNc(14,H,3,2,"div",6),t.YNc(15,j,2,1,"div",6),t.qZA()()),2&e&&(t.xp6(8),t.Q6J("ngIf",i.loading||i.pageLoading),t.xp6(1),t.Q6J("ngIf",!i.pageLoading),t.xp6(1),t.Q6J("ngIf",!i.pageLoading),t.xp6(1),t.Q6J("ngIf",!i.pageLoading),t.xp6(1),t.Q6J("ngIf",!i.pageLoading),t.xp6(1),t.Q6J("ngIf",!i.pageLoading),t.xp6(1),t.Q6J("ngIf",!i.pageLoading),t.xp6(1),t.Q6J("ngIf",!i.pageLoading))},dependencies:[d.rH,U.Hw,A.lW,y.Ou,g.sg,g.O5,l.Fj,l.JJ,l.On,v.Mz,p.uo,p.xl],styles:["body[_ngcontent-%COMP%]{z-index:-1;max-width:100%;overflow-x:hidden}.carousel-img[_ngcontent-%COMP%]{max-width:100%;width:1000px;height:600px;margin:auto;display:flex;justify-content:center}.img-in-carousel[_ngcontent-%COMP%]{max-width:100%;object-fit:contain}textarea[_ngcontent-%COMP%]{margin:0;padding-left:5px;width:100%;height:auto;font-size:small;vertical-align:middle;resize:none}.edit-button[_ngcontent-%COMP%]{float:right;color:#3f51b5;cursor:pointer}"]}),o})();var V=s(5914);const z=[{path:"",component:K}];let R=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[d.Bz.forChild(z),V.q,g.ez,l.u5,l.UX,v.GE,p.IJ]}),o})()}}]);