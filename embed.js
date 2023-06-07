//Instantiate the Viz
var viz, sheet, workbook; //We need this to be semi-global so we can reference it via multiple functions

    function initViz()
    {
        var containerDiv = document.getElementById("vizContainer"),
            
            url = "https://us-west-2b.online.tableau.com/t/geospatial/views/CitibikeData/Citibike" //PASTE LINK HERE
            options =
            {
              width: "1100px",  
              height: "650px",
                hideTabs: true,
                hideToolbar: true,
                onFirstInteractive: function () //This function fires only once, when the viz is first rendered
                {
                    console.log("Run this code when the viz has finished loading.");

                    workbook = viz.getWorkbook();
                    console.log(workbook);

                    sheet = viz.getWorkbook().getActiveSheet();
                    console.log(sheet.getName());

                    sheets = sheet.getWorksheets();
                    console.log(sheets);

                  for(var i =0; i < sheets.length; i++) {
                    sheetName = sheets[i].getName();
                    console.log(sheetName);
                  }
                    listenToMarksSelection();
                    $('#dataTablesDiv').hide();
                }
            }
        viz = new tableau.Viz(containerDiv, url, options); // This creates a viz object and embeds it in the container div.
    }

// Export Buttons
	function exportToPDF()
	{
            viz.showExportPDFDialog();
     }

    function exportToCSV()
    {
            viz.showExportDataDialog();
     }

    // Download a Crosstab
	function downloadCrosstab()
	{
		viz.showExportCrossTabDialog();
	}

//Filter & Revert
function filterOne(filterName, value) { //Borough
  for(var i =0; i < sheets.length; i++) {
    sheets[i].applyFilterAsync(filterName, value, tableau.FilterUpdateType.REPLACE);
  }
}

function clearFilters(filterName) {
  for(var i =0; i < sheets.length; i++) {
    sheets[i].clearFilterAsync(filterName);
  }
}

function revertAll() {
  viz.revertAllAsync();
}