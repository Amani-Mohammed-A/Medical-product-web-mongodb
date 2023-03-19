var express = require("express");
var app = express();
var mongoose = require("mongoose");
const path = require("path");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Phase2", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Port 3000 is contact");
    })
    .catch((err) => {
        console.log(" there is  an error !");
        console.log(err);
    });

var products = new mongoose.Schema({
	name: String,
	img: String,
	 description : String,
	 // title: String
	})
var contact = new mongoose.Schema({
	fname:String,
	lname:String,
	email:String,
	 City:{
	 type: String,
	 enum: ['Riyadh' ,'Dammam','Jeddah','Mecca','Medina','Taif','Yanbu']
	 },
	Subject:String
	})
	
var pro = mongoose.model('pro',products)
// 	 pro.insertMany([
// 	 	 {
//        name:'Wheel chair',
//     img:"https://talabiah.com/wp-content/uploads/2018/04/%D9%83%D8%B1%D8%B3%D9%8A-%D9%83%D9%87%D8%B1%D8%A8%D8%A7%D8%A6%D9%8A-%D9%85%D8%AA%D8%AD%D8%B1%D9%83-%D8%AE%D9%81%D9%8A%D9%81-%D8%A7%D9%84%D9%88%D8%B2%D9%8611.jpg",
//        description :' wheelchair is a manually operated or power-driven device designed primarily for use by an individual with a mobility disability for the main purpose of indoor, or of both indoor and outdoor, locomotion.  Individuals with mobility disabilities must be permitted to use wheelchairs and manually powered mobility aids, i.e., walkers, crutches, canes, braces, or other similar devices designed for use by individuals with mobility disabilities, in any areas open to pedestrian traffic.'      
//        },
//          { 
//         name:'Eyeglasses',
//       img:'https://img.ebdcdn.com/product/front/white/pl6605.jpg?im=Resize,width=700,height=350,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0',
//      description :'Eyeglasses are the most common form of eyewear used to correct or improve many types of vision problems. They consist of a frame that holds 2 pieces of glass or plastic, which have been ground into lenses to correct refractive errors. Refractive errors can include trouble seeing far away (nearsightedness or myopia) and trouble seeing close up (farsightedness or hyperopia). They can also include blurring due to an irregularly shaped cornea (astigmatism). Eyeglasses work by adding or subtracting focusing power to the eye s cornea and lens.'      
//     },
//     	{name:'crutch',
//    img:'https://cdn.spama.com/image/cache/catalog/spama/products/01040100001-500x500.jpg.webp',
//      description :'Crutches are a type of Walking Aids that serve to increase the size of an individuals Base of support. It transfers weight from the legs to the upper body and is often used by people who cannot use their legs to support their weight (ie short-term injuries to lifelong disabilities).'      
//      },
//   {
//   	name:'Medical bed',
//    img:'https://www.arkanlabs.com/image/cache/catalog/electric-hospital-bed-31699-460x337.jpg',
// 		description : 'a bed having side rails that can be raised or lowered and a mattress base in three jointed sections so that the head, foot, or middle may be raised by a crank or motor, allowing a patient to lie in various positions, as a therapeutic aid or for comfort.'
// 	  },   
//        ]) 
 var c = mongoose.model('c',contact)
	//  c.insertMany([
	//  	 {
	//  	fname: 'amani',
	//       lname:'mohammed',
	//   	email : 'amani111420@gmail.com',
		
	// 	 City: 'Medina',
	// subject:'thanks'

    //     },     
    //   ])


app.get('/',async function(req , res){
	var main = await pro.find({}).limit(3).sort({_id :-1});
	res.render("landing",{main});
})

app.get('/products',async function(req , res){
	var prod = await pro.find({})
	res.render("index",{prod});
})

app.get('/products/:id',async function(req , res){
	var id = req.params.id
	var p = await pro.findById(id)
	res.render("show" , {p});
})

app.get('/about',function(req , res){
	res.render("about");
})
app.get('/contact',function(req , res){
		var array = ['Riyadh' ,'Dammam','Jeddah','Mecca','Medina','Taif','Yanbu']
	res.render("contact",{array});
})

app.post('/',function(req , res){
	var newcontact = new c(req.body)
	newcontact.save();
	res.redirect('/');
})

app.listen(3000,function() {
	console.log("port 3000");
})