export function createPopupBoxContent(name: string, location: string, status: string, type: string, color: string, svgFunction: (color: string) => string) {

  return `
  <head><link rel='stylesheet' href='../../styles.css'/>
  <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Arimo"></head>
  <body>
    <div class='popup'>
      <div class='typeBox'>
        ${type ? 
          `<p class='featureType'> Feature Type: </p>
           <p class='featureLabel'><b>${type.toUpperCase()}</b></p>
          ${svgFunction(color)}` 
          : ''}
      </div>
      <div class='infoBox'>

        ${status ? `<p class='statusText'><b>Status: </b>${status}</p>` : ''}
        <a href="https://ma.adopt-a-drain.org/register?selectedDrainId=1084" class='adoptLink'>Interested in adopting →</a>
      </div>
    </div>
    </body>
    `;
}

/**
 *       ${name ? `<p><b>Name: </b>${name}</p>` : ''}
        ${location ? `<p><b>Location: </b>${location}</p>` : ''}
 */