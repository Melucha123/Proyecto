new Vue({
	el:".divlogin",
	data:{
		type: 0, //0 = login, 1 = registro
		form:{
			email:"",
			password:""
		},
		reg:{
			nombres:"",
			apellidos:"",
			tipodocument:"",
			lugarnaci:"",
			email:"",
			telefono:"",
			usuario:"",
			password:"",
			password1:"",
			lugarresi:""

		}
	},
	methods:{
		SendF(){
			if(this.validacionemail == false){
				if(this.validacionpass == false){
					console.log(this.form)
				}
				else{
					alert("Por favor coloque una contraseña valida")
				}
			}
			else{
				alert("Por favor coloque un email valido")
			}
		
		},
		SendR(){
				console.log(this.reg)
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
		Repetir(){
			if(this.form.password==this.form.password1){
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
		}

	}
});