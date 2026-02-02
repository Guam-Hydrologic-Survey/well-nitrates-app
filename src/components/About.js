/* 
About.js
Parameters: "element" - an HTML element with ID for about modal
Return: none
*/

export function About(element) {
  element.innerHTML = /*html*/
  `
  <div class="modal fade" id="about" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">

          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">About</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <span class="weri-tr-title" id="weri-tr-num">WERI Technical Report No. 180</span>
            <br>
            <span class="weri-tr-title" id="weri-tr-text">Northern Guam Lens Aquifer Production Well Nitrates</span>
            <br><br>

            <!-- nav tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1"
                        type="button" role="tab" aria-controls="tab1" aria-selected="true">Abstract</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2"
                        type="button" role="tab" aria-controls="tab2" aria-selected="false">Developers</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3"
                        type="button" role="tab" aria-controls="tab3" aria-selected="false">Acknowledgements</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab4-tab" data-bs-toggle="tab" data-bs-target="#tab4"
                        type="button" role="tab" aria-controls="tab4" aria-selected="false">References
              </li>
            </ul>

            <!-- tab content -->
            <div class="tab-content mt-3" id="myTabContent">

            <!-- start of tab 1 -->
              <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                <p>
                  <strong>MAppFx</strong> is a web page interactive map environment that retrieves an interactive graph of a site upon clicking a map feature object (be it a point, polygon, or a line). WERI Web MAppFx is a product of WERI through the Guam Hydrologic Survey Program (P.L. 24-247) and USGS 104-b, available through the <a href="https://guamhydrologicsurvey.uog.edu/" target="_blank" rel="noreferrer noopener">Guam Hydrologic Survey website</a>. MAppFx is developed by GHS Information Management Team Dannika K. U. Valerio, Matt W. Zapata, Leroy F. Heitz, and Nathan C. Habana in collaboration with Brigham Young University Civil Engineering Department Riley Hales, Gus Williams, and Norm Jones
                  <br><br>
                  GHS data analysis of Guam’s production well nitrate-n samples was done by Jezreelyn Y. Bulaklak and Nathan Habana. A <a href="https://www.postguam.com/news/local/study-nitrate-levels-rising-in-water-wells/article_030ad950-27a5-11eb-b457-275e19ec9e17.html" target="_blank" rel="noreferrer noopener">Scientific Advisory Report </a>was produced and written by Jezreelyn Bulaklak, Nathan Habana, and John Jenson.
                  <br><br>
                  Data originated from Guam Waterworks Authority as organized and transferred through Mauryn McDonald (<a href="https://weri-cdn.uog.edu/wp-content/PDFs/TRs/WERI%20TR%2095%20-%20McDonald%202002.pdf" target="_blank" rel="noreferrer noopener">WERI Technical Report 95</a>), and lab records from Jennifer Cruz, N’tasha Perez, and Carmen Sian-Denton and Gary Denton.
                </p>
              </div> <!-- end of tab 1 -->

              <!-- start of tab 2 -->
              <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                <p>
                  <strong>WERI-GHS Information Management Team:</strong>
                  <br>DK Valerio · MW Zapata · NC Habana
                </p>
              </div> <!-- end of tab 2 -->

              <!-- start of tab 3 -->
              <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                <p>
                  <strong>Acknowledgements</strong><br>
                  <i>Brigham Young University</i><br>
                  Civil Engineering Department, Hydroinformatics Laboratory <br>
                  Riley Hales · Gus Williams · Norm Jones <br><br>
                  
                  <i>Water & Environmental Research Institute of the Western Pacific</i> <br>
                  University of Guam <br>
                  Jezreelyn Y. Bulaklak · Joseph D. Rouse · John W. Jenson · Leroy F. Heitz <br><br>
                  
                  <i>University of Guam’s Web Team</i><br>
                  John Wiglesworth · Matthew Raymundo · UOG Web Team · Rommel Hidalgo <br><br>

                  <i>Guam Waterworks Authority</i><br>
                  Jennifer O. Cruz · N'tasha Perez · Carmen Sian-Denton · Mauryn McDonald · Vangie Lujan · Paul Kemp · Brett Raily · Miguel C. Bordallo <br><br>

                  <i>Guam Hydrologic Survey, DOI USGS NIWR</i><br><br>

                  <i>One Guam Water Resources Information Program</i>
                </p>
              </div> <!-- end of tab 3 -->

              <!-- start of tab 4 -->
              <div class="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
                <p>
                  <strong>References</strong><br>
                  McDonald, M.Q. (2002) <a href="https://weri-cdn.uog.edu/wp-content/PDFs/TRs/WERI%20TR%2095%20-%20McDonald%202002.pdf" target="_blank" rel="noreferrer noopener">Nitrate-Nitrogen Concentrations in the Northern Guam Lens and Potential Nitrogen Source</a>. WERI Technical Report 95, WERI UOG, Mangilao, Guam.<br><br>

                  Bulaklak, J.Y., Habana, N.C., and J.W. Jenson (2020) <a href="https://www.postguam.com/news/local/study-nitrate-levels-rising-in-water-wells/article_030ad950-27a5-11eb-b457-275e19ec9e17.html" target="_blank" rel="noreferrer noopener">WERI Scientific Advisory Paper, Nitrate Occurrence and Trends in the Northern Guam Lens Aquifer: Observations and Findings to Date</a>. WERI UOG. Made available through the Guam Daily Post article, WERI advisory paper on Bill 404.
                </p>
              </div> <!-- end of tab 4 -->

            </div> <!-- end of tab content -->
          </div> <!-- end of modal body -->

          <div class="modal-footer about-btns">
            <a class="btn btn-primary" href="https://guamhydrologicsurvey.uog.edu/2023/02/28/mappfx-northern-guam-lens-aquifer-production-well-nitrates/" title="Read WERI TR No. 180 on GHS" target="_blank" rel="noreferrer noopener" role="button">WERI Technical Report</a>
            <!-- Dropdown for links to GHS maps libraries -->
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                WERI Map Series
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="https://guamhydrologicsurvey.uog.edu/mappfx-library/" title="MAppFx Library on GHS" target="_blank" rel="noreferrer noopener">MAppFx Library</a></li>
                <li><a class="dropdown-item" href="https://guamhydrologicsurvey.uog.edu/web-mapps/" title="Web MApps Library on GHS" target="_blank" rel="noreferrer noopener">Web MApps</a></li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    `
}