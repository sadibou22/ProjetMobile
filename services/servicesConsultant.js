//Tableau de mes extensions permises
exports.extensionsValides=['csv','json'];
//exports.fileExt //stock l'extension du fichier
var getExtension = function(filename)
    {
        var parts = filename.split(".");
        return (parts[(parts.length-1)]);
    }    


    // v�rifie l'extension d'un fichier upload�
    // filename : file a valider
    // listeExt : liste des extensions autoris�es
exports.verifFileExtension =  function(listeExt, filename )
    {
	//filename = document.getElementById(champ).value.toLowerCase();
	var fileExt = getExtension(filename);
	for (var i=0; i<listeExt.length; i++)
	{
		if ( fileExt == listeExt[i] ) 
		{
			console.log("OK");
			return (true);
		}
	}
	console.log("Votre CV doit �tre au format Word csv ou json");
	return (false);
     }
 
