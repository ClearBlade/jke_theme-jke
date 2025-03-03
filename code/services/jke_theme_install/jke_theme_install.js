/**
 * @typedef {{prefix: string, entity_id: string, component_id: string, mfe_settings: Record<string, unknown>}} InstallParams
 * @param {CbServer.BasicReq & {params: InstallParams}} req
 * @param {CbServer.Resp} resp
 */

function jke_theme_install(req, resp) {
  
  var params = req.params;
  var systemKey = req.systemKey; 
  var userToken = req.userToken; 

  // Branding Data
  var brandingData = {
      id: "brand",
      config: JSON.stringify([{
          logo: {
              logoUrl: "https://i.postimg.cc/jSjTsLRb/Screenshot-2025-03-03-at-1-06-03-PM.png"
          },
          title: {
              titleText: "JK Enterprise Solutions"
          }
      }]),
      description: "Branding Configuration for JK Enterprise Solutions"
  };

  var settingsUrl = "https://demo.clearblade.com/api/v/1/collection/" + systemKey + "/custom_settings";
  
  var brandingOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "ClearBlade-UserToken": userToken
      },
      body: JSON.stringify(brandingData)
  };

  fetch(settingsUrl, brandingOptions)
      .then(function (response) {
          if (!response.ok) {
              throw new Error("Failed to create branding data: " + response.statusText);
          }
          return response.json();
      })
      .then(function (responseData) {
          log("Branding data created successfully: " + JSON.stringify(responseData));

          // Theme Data
          var themeData = {
              id: "theme",
              config: JSON.stringify([{
                  palette: {
                      primary: {
                          lightMode: "#000000"
                      },
                      banner: {
                          lightMode: "#000000",
                          darkMode: "#000000"
                      }
                  }
              }]),
              description: "Theme Configuration"
          };

          var themeOptions = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "ClearBlade-UserToken": userToken
              },
              body: JSON.stringify(themeData)
          };

          return fetch(settingsUrl, themeOptions);
      })
      .then(function (response) {
          if (!response.ok) {
              throw new Error("Failed to create theme data: " + response.statusText);
          }
          return response.json();
      })
      .then(function (responseData) {
          log("Theme data created successfully: " + JSON.stringify(responseData));
          resp.success("PxC Theme Component Installed Successfully with Branding & Theme Config!");
      })
      .catch(function (error) {
          log("Error in installation: " + JSON.stringify(error));
          resp.error("Failed to install PxC Theme Component: " + JSON.stringify(error));
      });
}