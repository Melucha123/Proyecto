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
			email:"",
			password:""
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
								console.log(actual);
								
							}
							console.log(vue.actualUser);
						});
					})
					console.log("se inicio sesion");

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
        },

		SendF(){
			var tis = this;
			if(this.validall1()){
				console.log(this.form);
				if(this.type == 0){
					this.login(this.form).then(function(userData){
						tis.sesion = true;
					}).catch(function(error){
						alert("No coinciden las credenciales, por favor revise");
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
					alert("Su registro se ha completado exitosamente");
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
							console.log("se registro correctamente")
						})
					}).catch(function(error){
						alert(error.message);
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