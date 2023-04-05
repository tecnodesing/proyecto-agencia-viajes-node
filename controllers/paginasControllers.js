import { viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
    //consultar 3 viajes del modelo Viaje
    const promiseDB = [];

    promiseDB.push(viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {
        const resultado = await Promise.all(promiseDB)

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros =  (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    //consultar DB
    const viajes = await viaje.findAll();
    // console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes: viajes
    });
}

const paginaDetalleViaje = async (req, res) => {
    
    const { slug } = req.params;
    // console.log(req.params);

    try {
        const resultado = await viaje.findOne({ where : {slug}});
        res.render('viaje', {
            pagina: 'Información Viaje',
            resultado
        })
    } catch (error) {
        console.log(error);
    }
}

const paginaTestimoniales = async(req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
   
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}