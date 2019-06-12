let pg1, pg2, pta, ta, cv;

function setup(){
    noCanvas();    
    // Création des éléments HTML
  
    // Label tu textarea
    label_ta = createElement('h3', 'Texte à rédiger en MarkDown');
    // Label du preview
    label_preview = createElement('h3', 'Preview après conversion'); 
    // Textearea view
    ta = createElement('textarea', 'Texte de base.').addClass('form-control');
    ta.size(windowWidth/3, windowHeight - 100);
    // Preview view
    preview = createP().addClass('preview');
    
    // Bouton d'export HTML et wiki
    btn_html = createButton('Export en HTML').addClass('btn btn-primary');
    btn_wiki = createButton('Export en Wikimedia').addClass('btn btn-primary');
  
    // Label d'information markdown  
    label_info = createP('MarkDown possible : <br />'
                        + '<h1>h1 : #</h1>'
                        + '<h2>h2 : ##</h2>'
                        + '<h3>h3 : ###</h3>'
                        + '<h4>h4 : ####</h4>'
                        + '<h5>h5 : #####</h5>'
                        + '<h6>h6 : ######</h6>'
                        + '<b>Texte en gras : ** Texte **</b><br />'
                        + '<i>Texte en italique : * Texte *</i>').addClass('preview');
    //console.log(pta);
}

function draw(){
    // Positionnement des éléments
    label_ta.position(10,0);
    label_preview.position(windowWidth/2 + 5, 0);
    ta.position(10,50);
    preview.position(windowWidth/2 + 5, 50);
    preview.size(windowWidth/2 - 25, windowHeight - 100);
  
    btn_html.position(ta.x + ta.width + 30, 50);
    btn_wiki.position(btn_html.x, btn_html.y + 50);
    btn_html.mousePressed(export_html);
    btn_wiki.mousePressed(export_wiki);  
    label_info.position(btn_html.x, btn_wiki.height + btn_wiki.y + 20);
  
    // Edition du preview à chaque frappe dans le textarea avec une transformation
    preview.html(transformation(ta.value()));
}
/*
function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}
*/

function transformation(tx){
    
    // Titre (H1 à H6)
    // Partir de H6 vers H1 sinon priorité aux 1ère occurrence #
    tx = tx.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
    tx = tx.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
    tx = tx.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
    tx = tx.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
    tx = tx.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
    tx = tx.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');
    
    // Gras + Italique
    // Même chose que pour les titres pour l'ordre
    tx = tx.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
    tx = tx.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
    
    
    // Saut à la ligne (P)
    
    tx = tx.replace(/^\s*(\n)?(.+)/gm, function(m){
      return  /\<(\/)?(h\d)/.test(m) ? m : '<p>'+m+'</p>';
    });

    return tx;
    
  }

  function export_html(){
    console.log(preview.elt.innerHTML);
  }

  function export_wiki(){
    console.log(ta.elt.value);
  }