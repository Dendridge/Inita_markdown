function setup(){
    noCanvas();    
    // Création des éléments HTML pour un affichage avec bootstrap
    container = document.getElementById('container');
    row_header = createDiv().addClass('row');
    row_content = createDiv().addClass('row');
    // Label info
    label_info = createElement('h3', 'Info MarkDown').addClass('col-2');
    // Label tu textarea
    label_ta = createElement('h3', 'Texte à rédiger en MarkDown').addClass('col-5');
    // Label du preview
    label_preview = createElement('h3', 'Preview après conversion').addClass('col-5'); 
  
    // Label d'information markdown  
    div_info = createP('MarkDown possible : <br />'
                        + '<h1>h1 : #</h1>'
                        + '<h2>h2 : ##</h2>'
                        + '<h3>h3 : ###</h3>'
                        + '<h4>h4 : ####</h4>'
                        + '<h5>h5 : #####</h5>'
                        + '<h6>h6 : ######</h6>'
                        + '<b>Texte en gras : ** Texte **</b><br />'
                        + '<i>Texte en italique : * Texte *</i>').addClass('preview col-2');
    // Textearea view
    ta = createElement('textarea', 'Texte de base.').addClass('form-control col-5');
    // Preview view
    preview = createP().addClass('preview col-5');
    // Bouton d'export HTML et wiki
    btn_html = createButton('Export en HTML').addClass('btn btn-primary');
    btn_wiki = createButton('Export en Wikimedia').addClass('btn btn-primary');
  
    //console.log(ta);
    // Assignation child > parent
    row_header.parent(container);
    row_content.parent(container);
    label_info.parent(row_header);
    label_ta.parent(row_header);
    label_preview.parent(row_header);
    div_info.parent(row_content);
    ta.parent(row_content);
    preview.parent(row_content);
    btn_html.parent(div_info);
    btn_wiki.parent(div_info);
    // Définition d'action des boutons
    btn_html.mousePressed(export_html);
    btn_wiki.mousePressed(export_wiki);  
}

function draw(){
    // A chaque changement mettre à jour le text preview avec transformation
    preview.html(transformation(ta.value()));
}

// Fonction permettant la transformation d'élément Markdown en HTML
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
    tx = tx.replace(/[\*]{2}([^\*]+)[\*]{2}/g, '<b>$1</b>');
    tx = tx.replace(/[\*]{1}([^\*]+)[\*]{1}/g, '<i>$1</i>');
    
    
    // Saut à la ligne (P)    
    tx = tx.replace(/^\s*(\n)?(.+)/gm, function(m){
      return  /\<(\/)?(h\d)/.test(m) ? m : '<p>'+m+'</p>';
    });

    return tx;
    
  }
  // Fonction d'export du format HTML
  function export_html(){
    console.log(preview.elt.innerHTML);
    saveStrings(split(preview.elt.innerHTML, ' '), 'version_html.txt');
  }

  // Fonction d'export du format Wiki
  function export_wiki(){
    console.log(ta.elt.value);
    saveStrings(split(ta.elt.value, ' '), 'version_wiki.txt');
  }