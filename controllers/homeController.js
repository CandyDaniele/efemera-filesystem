const path = require("path");
const fs = require("fs");

const homeController = {
  index: (req, res) => {
    let servicos = [{
        nome: 'Dev Full Stack',
        imagem: '/imagens/undraw_dev_focus.svg'
      },
      {
        nome: 'Marketing Digital',
        imagem: '/imagens/undraw_social_dashboard.svg'
      },
      {
        nome: 'Consultoria UX',
        imagem: '/imagens/undraw_mobile_apps.svg'
      }
    ];

    let banners = [
      '/imagens/banner.jpg',
      '/imagens/banner3.jpg',
    ];

    res.render(
      'index', {
        title: 'Home',
        listaServicos: servicos,
        listaBanners: banners
      }
    );
  },
  contato: (req, res) => {
    let {
      nome,
      email,
      mensagem
    } = req.body;

    let infoContato = {
      nome,
      email,
      mensagem
    };
    //let infoContatoJSON = JSON.stringify(infoContato);

    //let datetime = new Date().toLocaleDateString();
    //let datetime = new Date().getTime();
    //const db = path.join("db", `contato_${datetime}_${nome}.json`);
    const db = path.join("db", "contatos.json");
    let listaContato = [];
    if(fs.existsSync(db)){
            //trazendo conteudo do arquivo em formato json
            listaContato = fs.readFileSync(db, {encoding: "utf-8"});
            //transformando jason em objeto
            listaContato = JSON.parse(listaContato);
            //pegando array de inscritos e adicionando um novo email
            listaContato.push(infoContato);
      
          } else {
            listaContato.push(infoContato);
    }
    listaContato = JSON.stringify(listaContato);

    fs.writeFileSync(db, listaContato);
    //fs.appendFileSync(db, infoContatoJSON);

    res.render('contato', {
      nome,
      email,
      mensagem,
      title: 'Contato'
    });
  },
  newsletter: (req, res) => {
    let {email} = req.query;

    const fileNewsletter = path.join("db", "newsletter.json");
    let listaNewsletter = {};
    if (fs.existsSync(fileNewsletter)) {
      //trazendo conteudo do arquivo em formato json
      listaNewsletter = fs.readFileSync(fileNewsletter, {encoding: "utf-8"});
      //transformando jason em objeto
      listaNewsletter = JSON.parse(listaNewsletter);
      //pegando array de inscritos e adicionando um novo email
      listaNewsletter.inscritos.push(email);

    } else {
      listaNewsletter = {
        inscritos: [email]
      };
    }
    listaNewsletter = JSON.stringify(listaNewsletter);
    //guardando lista de inscritos com o novo email
    fs.writeFileSync(fileNewsletter, listaNewsletter);


    // POST - req.body
    // GET - req.query
    // GET /:email - req.params

    res.render('newsletter', {
      email,
      title: 'Newsletter'
    });
  }
};

module.exports = homeController;