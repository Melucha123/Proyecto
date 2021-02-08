var firebaseConfig = {
    apiKey: "AIzaSyC7P1bJFrIizdvVgL9dNHVFc2OVKtjO7tc",
    authDomain: "taller-8-75077.firebaseapp.com",
    databaseURL: "https://taller-8-75077-default-rtdb.firebaseio.com",
    projectId: "taller-8-75077",
    storageBucket: "taller-8-75077.appspot.com",
    messagingSenderId: "986036997861",
    appId: "1:986036997861:web:0d4e4887e0bc44448bce0c",
    measurementId: "G-PQEZZXTXKF"
};
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var user = firebase.auth().currentUser;
var db = firebase.firestore();

 const vue = new Vue({
	el:".divlogin",
	data:{
		listUser: [],
		actualUser: null,
		sesion:false,
		selected: '',
		type: 0, //0 = login, 1 = registro
		form:{
			email:"rolo0828@gmail.com",
			password:"Prens123"
		},
		reg:{
			nombres:"",
			apellidos:"",
			tipodocumento:"",
			documento:"",
			lugarnacimiento:"",
			fechanacimiento:"",
			email:"",
			telefono:"",
			usuario:"",
			password:"",
			password1:"",
			lugaresidencia:""
		}
	},
	created(){
		this.test()
	},
	methods:{
		test(){
            auth.onAuthStateChanged(function(user){
                if(!user){
				console.log("falta inciar sesion");
			}
				else{
					this.sesion=true;
					var actual = null;
					var vm = this;
					db.collection('users').onSnapshot((snap) => {
						snap.forEach(user1 =>{
							if(user.email == user1.data().email) {
								actual = user1.data();
								vue.actualUser = actual;
								
							}
						})
					})
				}
            })
        },
        register(data){
            return auth.createUserWithEmailAndPassword(data.email, data.password);
        },
        login(data){
            return auth.signInWithEmailAndPassword(data.email, data.password);
        },
        logout(){
            auth.signOut();
            this.sesion = false;
            swal("YEY!","Sesion cerrada", "success");
            this.form.email = "";
			this.form.password = "";
        },

		SendF(){
			var tis = this;
			if(this.validall1()){
				if(this.type == 0){
					this.login(this.form).then(function(userData){
						tis.sesion = true;
					}).catch(function(error){
						swal("OH NO!","No coinciden las credenciales, por favor revise","error");
					})
				}
			} 
		},
		validall1(){
			if(!this.validacionemail && !this.validacionpass){
				return true;
			}
			else{
				return false
			}
		},
		SendR(){
			var tis = this;
			if(this.validall()){				
				if(this.type!=0){
					this.register(this.reg).then(function(userData){
						var user={
							email:tis.reg.email.toLowerCase(),
							id:userData.user.uid,
							nombres: tis.reg.nombres,
							apellidos: tis.reg.apellidos,
							TipoDocumento: tis.reg.tipodocumento,
							Documento: tis.reg.documento,
							LugarDeNacimiento: tis.reg.lugarnacimiento,
							FechaDeNacimiento: tis.reg.fechanacimiento,
							Telefono: tis.reg.telefono,
							Usuario: tis.reg.usuario,
							Contraseña: tis.reg.password,
							LugarResidencia: tis.reg.lugaresidencia
						};
						db.collection('users').doc(userData.user.uid).set(user).then(function(){
							swal("Buen trabajo!","Su registro se ha completado exitosamente", "success");

						})
					}).catch(function(error){
						swal("Oops", "El usuario ya se encuentra registrado", "error");
					});
					this.type = 0;
				}
			}
			
		},
		validall(){
			if(!this.validacionemail1 && !this.validacionpass1 && !this.Repetir1 && !this.VNombres && !this.VApellidos && !this.Vdoc && !this.Vlugar && !this.Vusuario && !this.Vlugarr){
				return true;
			}
			else{
				return false
			}
		},
		editNom(actualUser){
			swal({
				text:"Nombre(s)",
				content:"input",
				button:{
					text:"Editar",
					closemodal:false
				}
			}).then(nombres=>{
				if(!nombres){
					swal("Oops!","El nombre es requerido", "error");
					return false;
				}
				var data = {nombres:nombres};
				db.collection('users').doc(actualUser.id).update(data).then(function(data){
					swal("Bien!","Tu(s) nombre(s) a sido editado", "success");
				})
			})
		},
		editAp(actualUser){
			swal({
				text:"Apellidos",
				content:"input",
				button:{
					text:"Editar",
					closemodal:false
				}
			}).then(apellidos=>{
				if(!apellidos){
					swal("Oops!","Los apellidos son requeridos", "error");
					return false;
				}
				var data = {apellidos:apellidos};
				db.collection('users').doc(actualUser.id).update(data).then(function(data){
					swal("Bien!","Tus apellidos a sido editados", "success");
				})
			})
		},
		editTd(actualUser){
			swal({
				text:"Tipo de Documento",
				content:"input",
				button:{
					text:"Editar",
					closemodal:false
				}
			}).then(TipoDocumento=>{
				if(!TipoDocumento){
					swal("Oops!","¿Cual es el tipo de documento?", "error");
					return false;
				}
				var data = {TipoDocumento:TipoDocumento};
				db.collection('users').doc(actualUser.id).update(data).then(function(data){
					swal("Bien!","El tipo de documento ha sido editado", "success");
				})
			})
		},
		editD(actualUser){
			swal({
				text:"Numero de Documento",
				content:"input",
				button:{
					text:"Editar",
					closemodal:false
				}
			}).then(Documento=>{
				if(!Documento){
					swal("Oops!","¿Cual tu numero de documento?", "error");
					return false;
				}
				var data = {Documento:Documento};
				db.collection('users').doc(actualUser.id).update(data).then(function(data){
					swal("Bien!","El numero de documento ha sido editado", "success");
				})
			})
		},
		deleteUser(actualUser){
			swal({
				title: "¿Seguro que deseas eliminar esta cuenta?",
				text: "Esta accion es irreversible",
				icon: "warning",
				buttons:true,
				dargeMode:true
			}).then((del) => {
				if(del){
					var user = firebase.auth().currentUser;
					 	user.delete().then(function() {
						  console.log("se elimino el auth")
						});
					db.collection("users").doc(actualUser.id).delete();
					this.sesion = false;
					swal("Eliminada", "Esta cuenta se ha eliminado exitosamente", "success");
				}
			})
		}
	},
	computed:{
		validacionemail(){
			var exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			if(exp.test(this.form.email)){
				return false;
			} else{
				return true;
			}
		},
		validacionpass(){
			 var exp = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
            if(exp.test(this.form.password)){
				return false;
			}
			else{
				return true;
			}
		},
		validacionemail1(){
			var exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			if(exp.test(this.reg.email)){
				return false;
			} else{
				return true;
			}
		},
		validacionpass1(){
			 var exp = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
            if(exp.test(this.reg.password)){
				return false;
			}
			else{
				return true;
			}
		},
		Repetir1(){
			if(this.reg.password==this.reg.password1){
				return false;	
			}
			else{
				return true;
			}
		},
		title(){
			return(this.type == 0)?'Ingreso':'Registro';
		},
		iniciar(){
			return(this.type == 0)?'Iniciar Sesion':'Registrarme';
		},
		VNombres(){
			if(this.reg.nombres != ""){
					return false;	
			}
			else{
				return true;
			}
		},
		VApellidos(){
			if(this.reg.apellidos != ""){
				return false;	
			}
			else{
				return true;
			}
		},
		Vdoc(){
			if(this.reg.documento != ""){
				return false;	
			}
			else{
				return true;
			}
		},
		Vlugar(){
			if(this.reg.lugarnacimiento != ""){
				return false;	
			}
			else{
				return true;
			}
		},
		Vusuario(){
			if(this.reg.usuario != ""){
				return false;	
			}
			else{
				return true;
			}
		},
		Vlugarr(){
			if(this.reg.lugaresidencia != ""){
				return false;	
			}
			else{
				return true;
			}
		},

	}
});