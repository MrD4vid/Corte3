
// const PRODUCTOS ="productos";

//     function guardarDatos(key, data) {
//       const dataString = JSON.stringify(data);
//       localStorage.setItem(key, dataString);
//   }
    
    const productos = [
    // Deportivos
    {
      id: 1,
      nombre: "Ferrari F8",
      precio: 2500000,
      categoria: "Auto Deportivo",
      descripcion: "Un auto deportivo de alto rendimiento con un potente motor V8, que ofrece una velocidad y manejo impresionantes.",
      material: "Fibra de Carbono, Aluminio",
      stock: 5,
      imagen: "./img/1.jpeg"
    },
    {
      id: 2,
      nombre: "Porsche 911",
      precio: 2200000,
      categoria: "Auto Deportivo",
      descripcion: "Un auto deportivo de lujo con características avanzadas y un motor trasero para un control preciso.",
      material: "Aluminio, Acero",
      stock: 4,
      imagen: "./img/2.jpg"
    },
    {
      id: 3,
      nombre: "Lamborghini Huracan",
      precio: 3000000,
      categoria: "Auto Deportivo",
      descripcion: "Un superdeportivo con un diseño agresivo y un motor V10 extremadamente potente.",
      material: "Fibra de Carbono, Aluminio",
      stock: 3,
      imagen: "./img/3.jpeg"
    },
    {
      id: 4,
      nombre: "Chevrolet Corvette",
      precio: 1800000,
      categoria: "Auto Deportivo",
      descripcion: "Un clásico estadounidense conocido por su rendimiento y diseño elegante.",
      material: "Fibra de Vidrio, Aluminio",
      stock: 6,
      imagen: "./img/4.jpg"
    },
    {
      id: 5,
      nombre: "Ford Mustang",
      precio: 1500000,
      categoria: "Auto Deportivo",
      descripcion: "Un clásico de autos musculosos con un toque moderno, que ofrece poder y estilo impresionantes.",
      material: "Acero, Aluminio",
      stock: 8,
      imagen: "./img/5.jpeg"
    },
    {
      id: 6,
      nombre: "Nissan GT-R",
      precio: 2000000,
      categoria: "Auto Deportivo",
      descripcion: "Un poderoso auto deportivo con tecnología avanzada y excelente manejo.",
      material: "Aluminio, Fibra de Carbono",
      stock: 4,
      imagen: "./img/6.jpg"
    },
    {
      id: 7,
      nombre: "Audi R8",
      precio: 2400000,
      categoria: "Auto Deportivo",
      descripcion: "Un auto deportivo de alta gama con un diseño elegante y un potente motor V10.",
      material: "Aluminio, Fibra de Carbono",
      stock: 5,
      imagen: "./img/7.jpg"
    },
    {
      id: 8,
      nombre: "McLaren 720S",
      precio: 3200000,
      categoria: "Auto Deportivo",
      descripcion: "Un superdeportivo de gama alta con una velocidad extraordinaria y aerodinámica avanzada.",
      material: "Fibra de Carbono, Aluminio",
      stock: 2,
      imagen: "./img/8.jpg"
    },
    {
      id: 9,
      nombre: "BMW i8",
      precio: 1700000,
      categoria: "Auto Deportivo",
      descripcion: "Un auto deportivo híbrido con diseño futurista y rendimiento ecológico.",
      material: "Fibra de Carbono, Aluminio",
      stock: 6,
      imagen: "./img/9.png"
    },
    {
      id: 10,
      nombre: "Dodge Challenger",
      precio: 1600000,
      categoria: "Auto Deportivo",
      descripcion: "Un auto musculoso estadounidense conocido por su potente motor y diseño icónico.",
      material: "Acero, Aluminio",
      stock: 7,
      imagen: "./img/10.jpg"
    },
  
    // Sedanes
    {
      id: 11,
      nombre: "Toyota Camry",
      precio: 300000,
      categoria: "Sedán",
      descripcion: "Un sedán confiable con un interior espacioso y rendimiento de combustible eficiente.",
      material: "Acero, Plástico",
      stock: 12,
      imagen: "./img/11.jpg"
    },
    {
      id: 12,
      nombre: "Honda Accord",
      precio: 280000,
      categoria: "Sedán",
      descripcion: "Un sedán mediano popular con características avanzadas de seguridad y un viaje cómodo.",
      material: "Acero, Aluminio",
      stock: 10,
      imagen: "./img/12.jpeg"
    },
    {
      id: 13,
      nombre: "BMW 5 Series",
      precio: 400000,
      categoria: "Sedán",
      descripcion: "Un sedán de lujo con características de primer nivel y excelentes dinámicas de conducción.",
      material: "Acero, Aluminio",
      stock: 6,
      imagen: "./img/13.jpeg"
    },
    {
      id: 14,
      nombre: "Mercedes-Benz E-Class",
      precio: 450000,
      categoria: "Sedán",
      descripcion: "Un sedán premium que ofrece comodidad excepcional, seguridad y tecnología.",
      material: "Acero, Aluminio",
      stock: 7,
      imagen: "./img/14.jpeg"
    },
    {
      id: 15,
      nombre: "Audi A6",
      precio: 420000,
      categoria: "Sedán",
      descripcion: "Un sedán sofisticado con rendimiento potente y tecnología de vanguardia.",
      material: "Acero, Aluminio",
      stock: 6,
      imagen: "./img/15.jpg"
    },
    {
      id: 16,
      nombre: "Tesla Model 3",
      precio: 500000,
      categoria: "Sedán",
      descripcion: "Un sedán eléctrico con tecnología avanzada y un rendimiento excepcional.",
      material: "Acero, Aluminio",
      stock: 5,
      imagen: "./img/16.jpg"
    },
    {
      id: 17,
      nombre: "Lexus ES",
      precio: 380000,
      categoria: "Sedán",
      descripcion: "Un sedán de lujo que combina confort y tecnología.",
      material: "Acero, Aluminio",
      stock: 4,
      imagen: "./img/17.jpeg"
    },
    {
      id: 18,
      nombre: "Nissan Altima",
      precio: 270000,
      categoria: "Sedán",
      descripcion: "Un sedán con un interior espacioso y tecnología moderna.",
      material: "Acero, Plástico",
      stock: 10,
      imagen: "./img/18.jpg"
    },
    {
      id: 19,
      nombre: "Hyundai Sonata",
      precio: 250000,
      categoria: "Sedán",
      descripcion: "Un sedán con un diseño elegante y un rendimiento de combustible eficiente.",
      material: "Acero, Plástico",
      stock: 9,
      imagen: "./img/19.jpeg"
    },
    {
      id: 20,
      nombre: "Kia Optima",
      precio: 240000,
      categoria: "Sedán",
      descripcion: "Un sedán que ofrece un gran valor por su diseño y características.",
      material: "Acero, Plástico",
      stock: 8,
      imagen: "./img/20.jpeg"
    },
  
    // Camionetas
    {
      id: 21,
      nombre: "Ford F-150",
      precio: 350000,
      categoria: "Camioneta",
      descripcion: "Una camioneta robusta y versátil, ideal para el trabajo y el ocio.",
      material: "Acero, Aluminio",
      stock: 7,
      imagen: "./img/21.jpeg"
    },
    {
      id: 22,
      nombre: "Chevrolet Silverado",
      precio: 370000,
      categoria: "Camioneta",
      descripcion: "Una camioneta de tamaño completo conocida por su potencia y capacidad.",
      material: "Acero, Aluminio",
      stock: 6,
      imagen: "./img/22.jpg"
    },
    {
      id: 23,
      nombre: "Ram 1500",
      precio: 380000,
      categoria: "Camioneta",
      descripcion: "Una camioneta que combina capacidad de carga y confort.",
      material: "Acero, Aluminio",
      stock: 5,
      imagen: "./img/23.jpeg"
    },
    {
      id: 24,
      nombre: "Toyota Tacoma",
      precio: 340000,
      categoria: "Camioneta",
      descripcion: "Una camioneta compacta perfecta para aventuras fuera de la carretera.",
      material: "Acero, Aluminio",
      stock: 8,
      imagen: "./img/24.jpg"
    },
    {
      id: 25,
      nombre: "Nissan Frontier",
      precio: 320000,
      categoria: "Camioneta",
      descripcion: "Una camioneta mediana que ofrece gran versatilidad y rendimiento.",
      material: "Acero, Aluminio",
      stock: 7,
      imagen: "./img/25.jpg"
    },
    {
      id: 26,
      nombre: "GMC Sierra",
      precio: 360000,
      categoria: "Camioneta",
      descripcion: "Una camioneta de lujo con un diseño elegante y características avanzadas.",
      material: "Acero, Aluminio",
      stock: 6,
      imagen: "./img/26.jpeg"
    },
    {
      id: 27,
      nombre: "Honda Ridgeline",
      precio: 330000,
      categoria: "Camioneta",
      descripcion: "Una camioneta que combina funcionalidad y confort.",
      material: "Acero, Aluminio",
      stock: 5,
      imagen: "./img/27.jpeg"
    },
    {
      id: 28,
      nombre: "Chevrolet Colorado",
      precio: 310000,
      categoria: "Camioneta",
      descripcion: "Una camioneta compacta con gran capacidad de carga y tecnología moderna.",
      material: "Acero, Aluminio",
      stock: 4,
      imagen: "./img/28.jpeg"
    },
    {
      id: 29,
      nombre: "Toyota Tundra",
      precio: 400000,
      categoria: "Camioneta",
      descripcion: "Una camioneta de tamaño completo con gran potencia y capacidad.",
      material: "Acero, Aluminio",
      stock: 3,
      imagen: "./img/29.jpg"
    },
    {
      id: 30,
      nombre: "Nissan Titan",
      precio: 360000,
      categoria: "Camioneta",
      descripcion: "Una camioneta robusta con tecnología avanzada.",
      material: "Acero, Aluminio",
      stock: 5,
      imagen: "./img/30.jpg"
    },
  
    // Motos
    {
      id: 31,
      nombre: "Yamaha YZF-R1",
      precio: 200000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta deportiva de alta potencia y rendimiento.",
      material: "Aluminio, Plástico",
      stock: 10,
      imagen: "./img/31.jpeg"
    },
    {
      id: 32,
      nombre: "Kawasaki Ninja ZX-10R",
      precio: 210000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta de competición con un diseño aerodinámico y motor potente.",
      material: "Aluminio, Plástico",
      stock: 8,
      imagen: "./img/32.jpg"
    },
    {
      id: 33,
      nombre: "Honda CBR1000RR",
      precio: 220000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta deportiva de alto rendimiento, ideal para pilotos experimentados.",
      material: "Aluminio, Plástico",
      stock: 7,
      imagen: "./img/33.jpg"
    },
    {
      id: 34,
      nombre: "Ducati Panigale V4",
      precio: 250000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta de lujo con tecnología avanzada y diseño italiano.",
      material: "Aluminio, Plástico",
      stock: 6,
      imagen: "./img/34.jpeg"
    },
    {
      id: 35,
      nombre: "BMW S1000RR",
      precio: 240000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta deportiva conocida por su potencia y tecnología innovadora.",
      material: "Aluminio, Plástico",
      stock: 5,
      imagen: "./img/35.jpeg"
    },
    {
      id: 36,
      nombre: "Suzuki GSX-R1000",
      precio: 230000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta deportiva que ofrece un equilibrio perfecto entre potencia y agilidad.",
      material: "Aluminio, Plástico",
      stock: 4,
      imagen: "./img/36.jpg"
    },
    {
      id: 37,
      nombre: "KTM RC 390",
      precio: 180000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta ligera y ágil, perfecta para principiantes.",
      material: "Aluminio, Plástico",
      stock: 8,
      imagen: "./img/37.jpeg"
    },
    {
      id: 38,
      nombre: "Yamaha MT-09",
      precio: 190000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta naked con un diseño moderno y un rendimiento emocionante.",
      material: "Aluminio, Plástico",
      stock: 7,
      imagen: "./img/38.jpeg"
    },
    {
      id: 39,
      nombre: "Honda CB500F",
      precio: 160000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta ideal para principiantes, con un diseño cómodo y manejable.",
      material: "Aluminio, Plástico",
      stock: 9,
      imagen: "./img/39.jpeg"
    },
    {
      id: 40,
      nombre: "Kawasaki Z650",
      precio: 170000,
      categoria: "Motocicleta",
      descripcion: "Una motocicleta versátil y cómoda, ideal para la ciudad y viajes cortos.",
      material: "Aluminio, Plástico",
      stock: 10,
      imagen: "./img/40.jpeg"
    }
  ];

   

  // guardarDatos(PRODUCTOS,productos);
  