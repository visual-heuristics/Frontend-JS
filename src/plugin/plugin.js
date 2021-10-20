/* eslint-disable no-undef */
var pddlWebUrl = "http://planimation.planning.domains/"
var PLANIMATION_HELP_MODEL=`
<div class="modal fade in" id="planimationhelpModal" tabindex="-1" role="dialog" aria-labelledby="helpModalLabel" aria-hidden="false" style="display: none;">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="helpModalLabel">Planimation Help and Information</h4>
      </div>
      <div class="modal-body">
        <p><strong>Planimation</strong> is a web application that animates plans (solutions) of problems specified in <a href="http://en.wikipedia.org/wiki/Planning_Domain_Definition_Language" target="_blank">PDDL</a>.

        Currently it supports the following features:</p>

        <ul>
          <li>Animate the plan returned by a planner deployed through the solver API: http://solver.planning.domains/solver</li>
          <li>Animate a text based uploaded plan compliant with the International Planning Competitions output: One grounded action per line </li>
          <li>Upload a saved animation file from planimation</li>
        </ul>
        <p>Click [<a href="https://github.com/planimation/documentation/tree/master/AnimationProfiles" target="_blank">here</a>] to download <strong>animation profiles</strong> for few domains, or [<a href="tinyurl.com/yxlt96fp" target="_blank">here</a>] to open a session with a Blocksworld example ready to planimate. You can also start a new file in the editor typing <strong>(animattion </strong> and use a snippet autocomplete template.</p> 
    <hr class="style1">
    <IMG src="https://github.com/planimation/documentation/raw/master/docs/images/readme/demo.gif">
    <hr class="style1">
    <strong>Contribute to Planimation</strong>
        <p>Planimation is a modular and extensible open source framework to visualise sequential solutions of planning problems specified in PDDL. It introduces a preliminary declarative PDDL-like animation profile specification, expressive
enough to synthesise animations of arbitrary initial states and goals of a benchmark with just a single profile. </p>
        
      <p>Planimation intends to help users to better understand AI planning, and its solutions. It's an open source project, So please contribute! You can find all the source code and documention at [<a href="https://github.com/planimation" target="_blank">here</a>]

        </p>
        <p>Any feedback, bug reports, comments, questions, or concerns can be sent to <a target="_blank" href="mailto:nir.lipovetzky@unimelb.edu.au">Nir Lipovetzky</a>, or through one of the issues tracker in the code repos at [<a href="https://github.com/planimation" target="_blank">github.com/planimation</a>].
        </p>

      </div>
      <div class="modal-footer">
      	
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

`
var PLANIMATION_MODEL =`
<!-- Choose Files Modal -->
<div class="modal fade" id="chooseFilesPlanimationModel" tabindex="-1" role="dialog" aria-labelledby="chooseFilesModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" style="display:inline" id="chooseFilesModalLabel">Planimate your plan</h4> | 
        <a onclick="$('#planimationhelpModal').modal(true)">  more info  <span class="glyphicon glyphicon-question-sign" style="cursor: pointer; top:7px !important; left:7px;font-size:25px;"aria-hidden="true"></span></a>
    
      </div>
      <div class="modal-body">
        <form class="form-horizontal left" role="form">
          <div class="form-group">
            <label for="domainPlanimationSelection" class="col-sm-4 control-label">Domain</label>
            <div class="col-sm-8">
              <select id="domainPlanimationSelection" class="form-control file-selection">
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="problemPlanimationSelection" class="col-sm-4 control-label">Problem</label>
            <div class="col-sm-8">
              <select id="problemPlanimationSelection" class="form-control file-selection">
              </select>
            </div>
          </div>
           <div class="form-group">
            <label for="animateSelection" class="col-sm-4 control-label">Animation</label>
            <div class="col-sm-8">
              <select id="animateSelection" class="form-control file-selection">
              </select>
            </div>
          </div>
       
        </form>

        <button id="filesChosenButton" class="btn-lg btn-success" type="button" onclick="filesChosen()">Planimate</button>
    


        <div class="form-group" style="display:inline-block">
            

         

        <div id="plannerURLInput" class="input-group">
          <input type="radio" id="urlradio" name="planradio"  onchange="on_change(this)" checked style="display:flex;position:relative;top:-10px;margin-left:15px;margin-right:-10px;">
          <span class="input-group-addon" id="customPlannerLabel">Custom Planner URL</span>
          <input id="plannerPlanimationURL" type="text" class="form-control" aria-describedby="customPlannerLabel" placeholder="http://solver.planning.domains/solve">
        </div>

<br/>
            <div class="col-sm-4" style="margin-bottom:5px;">
            <input type="radio" id="planradio" name="planradio" onchange="on_change(this)" style="margin-right:10px">
            <label>Upload Plan</label>
            </div>

            <div class="col-sm-4" style="position:relative;top:-5px;left:-6px;">
              <select id="planSelection" style="display:none" class="form-control file-selection">
              </select>
            </div>
          
      </div>
      <br/>

      <div class="modal-footer"  >
        <a href='${pddlWebUrl}' style="float:left" target="_blank">Try Planimation Web App</a>
        <button type="button" class="btn btn-default"  data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>
`


// global id and counter to maintain multiple iframes
var iframe_id = ''
var iframe_counter = 0

// function to load files into independent iframe
function loadData(){
          var planimation_iframe=document.getElementById(iframe_id.toString());
          var domText = window.ace.edit($('#domainPlanimationSelection').find(':selected').val()).getSession().getValue();
          var probText = window.ace.edit($('#problemPlanimationSelection').find(':selected').val()).getSession().getValue();
          var animateText = window.ace.edit($('#animateSelection').find(':selected').val()).getSession().getValue();
          var planSelected=document.getElementById("planradio").checked;
          if (planSelected){
          var planText = window.ace.edit($('#planSelection').find(':selected').val()).getSession().getValue();
          if (planText.length<2){
            planText=" "
          }
          }else{
            planText=" ";
          }

          var formData = new FormData();
          formData.append("domain", domText);
          formData.append("problem", probText);
          formData.append("animation", animateText);
      
          var xhr = new XMLHttpRequest();
          var url = 'https://planimation.planning.domains/upload/pddl';
          xhr.open("Post", url);
          xhr.send(formData);
          xhr.onreadystatechange = function (e) {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                  var status = xhr.status;
                  if (status === 0 || (status >= 200 && status < 400)) {
                      var vfg = JSON.parse(xhr.responseText);
                      
                      // store the VFG file
                      var message={"fileContent":vfg};
      
                      planimation_iframe.contentWindow.postMessage(message,"*");
                      window.toastr.success("Start Planimation!");
                  }
              } 
  
          }
      }

// function to run animation of resultant output in iframe
function runPlanimation() {
    window.planimationURL = $('#plannerPlanimationURL').val();
    if (window.planimationURL.slice(-1) === "/")
        window.planimationURL = window.planimationURL.slice(0, window.planimationURL.length-1);
    $('#chooseFilesPlanimationModel').modal('toggle');
    showPlanimation();

}

// run over all process and communicate with external process to generate plan
function showPlanimation() {
	iframe_counter= iframe_counter+1;
    var tab_name='<span class="glyphicon glyphicon-film" aria-hidden="true"></span> Planimation';

    window.new_tab(tab_name, function(editor_name) {
        var html = '';
		iframe_id += 'planimation_iframe'+iframe_counter.toString();
        html +='<html lang="en-us"> <head> <meta charset="utf-8"> <title>Planning Visualiser</title> <style> @media screen and (max-width: 1399px) {#';
		html +=iframe_id;
		html +='{ width:100%; height:640px;}} @media screen and (min-width: 1400px) {#';
		html +=iframe_id;
		html +='{ width:1200px;height:640px; }} </style> ';
		html +='<script type="text/javascript">';
		html +=' </script> </head> <body> <iframe scrolling="no" style="overflow:hidden" id=';
		html +='"'+iframe_id+'"'
		html +=` src=${pddlWebUrl}></iframe> </body></html>`;		
        $('#' + editor_name).html(html);
        window.toastr.success('Planimation Window Created!');
        // window.toastr.success('First time loading unity (wait 10s)');
    });

    return;

}
function choosePlanimationFiles(type) {

    window.action_type = type
    window.file_choosers[type].showChoice();

    var domain_option_list = "";
    var problem_option_list = "";
    var animate_option_list = "";
    var plan_option_list="";
    var unknown_option_list = "";
    var hr_line = "<option disabled=\"disabled\">---------</option>\n";
    var setDom = false;
    var setProb = false;
    var setAnimate = false;
    var setPlan = false;

    for (var i = 0; i < window.pddl_files.length; i++) {
        if ($.inArray(window.pddl_files[i], window.closed_editors) == -1) {
            if (window.pddl_files[i] == window.last_domain)
                setDom = true;
            if (window.pddl_files[i] == window.last_problem)
                setProb = true;
            if (window.pddl_files[i] == window.last_animate)
                setAnimate = true;
            if (window.pddl_files[i] == window.last_plan)
                setPlan = true;

            var option = "<option value=\"" + window.pddl_files[i] + "\">" + $('#tab-' + window.pddl_files[i]).text() + "</option>\n";
            var file_text = window.ace.edit(window.pddl_files[i]).getSession().getValue();
            if (file_text.indexOf('(domain') !== -1)
                domain_option_list += option;
            else if (file_text.indexOf('(problem') !== -1)
                problem_option_list += option;
            else if (file_text.indexOf('(animation') !== -1)
                animate_option_list += option;
            else
                unknown_option_list += option;
        }
    }

    var domain_list = domain_option_list+hr_line+unknown_option_list+hr_line+problem_option_list;
    var problem_list = problem_option_list+hr_line+unknown_option_list+hr_line+domain_option_list;
    var animate_list = animate_option_list+hr_line+unknown_option_list+hr_line+animate_option_list;
    var plan_list = plan_option_list+hr_line+unknown_option_list+hr_line+plan_option_list;
    $('#domainPlanimationSelection').html(domain_list);
    $('#problemPlanimationSelection').html(problem_list);
    $('#animateSelection').html(animate_list);
    $('#planSelection').html(plan_list);
    if (setDom)
        $('#domainPlanimationSelection').val(window.last_domain);
    if (setProb)
        $('#problemPlanimationSelection').val(window.last_problem);
    if (setAnimate)
        $('#animateSelection').val(window.last_animate);
    if (setPlan)
        $('#planSelection').val(window.last_plan);
    $('#chooseFilesPlanimationModel').modal('toggle');
}



function on_change(event){
      if (event.id=="planradio"){
       $('#planSelection').show();
}else{
 $('#planSelection').hide();
}
    
}

define(function () {

    // Use this as the default solver url
    window.planimationURL = "http://solver.planning.domains/solve";

      // Use a flag to only insert styles once
    window.planimationSolverStyled = false;

    return {

        name: "Planimation",
        author: "Nir Lipovetzky (plugin)",
        email: "nir.lipovetzky@unimelb.edu.au",
        description: "Solver to Animate PDDL Plans.",

        initialize: function() {
            // This will be called whenever the plugin is loaded or enabled

            // add code snippets for animation PDDL syntax
            var snippet = '';
            snippet += '(:predicate ${1:predicateName}\n';
            snippet += '   :parameters (?x ?y)\n';
            snippet += '   :priority 0\n';
            snippet += '   :effect( ... )\n';
            snippet += ')';
            window.add_snippet(snippet, "predicate");
            
            var snippet = '';
            snippet += '(define (animation domainName)\n';
            snippet += '\n';
            snippet += '\n';           
            snippet += '  ; Specifies visual effects when predicate becomes true in state\n';
            snippet += '  ;\n';
            snippet += '  ; Objects properties: \n';
            snippet += '  ;     (x) and (y) as integer coordinates or null value; \n';
            snippet += '  ;     (color) as a hexadecimal RGB value pre-specified colour constant or random color; \n';
            snippet += '  ;     (width) and (height) of the object; (prefabImage) as a base64 string of the object’s image\n';
            snippet += '  ;     (depth) of the object in the canvas;\n';
            snippet += '  ;     a boolean flag (showname) to specify whether to display the object’ name; \n';
            snippet += '  ;     and an optional label string to substitute the default name of the object in the canvas.\n';
            snippet += '  ;\n';
            snippet += '  ; special visual constraints can be used using (assign ) in the effects section of a predicate\n';
            snippet += '  ; See http://tinyurl.com/yxlt96fp for an example in editor.planning.domains\n';
            snippet += '  ; Documentation: https://github.com/planimation/documentation\n';
            snippet += ' \n';
            snippet += '   (:predicate predicateName\n';
            snippet += '                  :parameters ( ?obj )\n';
            snippet += '                  ; Using a custom visual object not refered in the parameters of the predcate \n';
            snippet += '                  :custom customObjName\n';
            snippet += '                  :effect(\n';
            snippet += '                  (equal (?obj x) (10))\n';
            snippet += '                  (equal (customObjName y) (add (?obj y) (10)) )\n';
            snippet += '                  )\n';
            snippet += '   )\n';
            snippet += '  \n';
            snippet += ' \n';
            snippet += '   ; Default Visual Object applied to all objects (default object)\n';
            snippet += '   (:visual DefaultVisualObjectName\n';
            snippet += '               :type default\n';
            snippet += '               :properties(\n';
            snippet += '                 (prefabImage img1)\n';
            snippet += '                 (showName TRUE)\n';
            snippet += '                 (x Null)\n';
            snippet += '                 (y Null)\n';
            snippet += '                 (color RANDOMCOLOR)\n';
            snippet += '                 (width 80)\n';
            snippet += '                 (height 80)\n';
            snippet += '               )\n';
            snippet += '   )\n';
            snippet += '  \n';
            snippet += '  ; Custom object representing the claw\n';
            snippet += '   (:visual customVisualObjName\n';
            snippet += '               :type custom\n';
            snippet += '               :objects ObjName1 ObjName2\n';
            snippet += '               :properties(\n';
            snippet += '                 (prefabImage img2)\n';
            snippet += '                 (showName FALSE)\n';
            snippet += '                 (x 300)\n';
            snippet += '                 (y 300)\n';
            snippet += '                 (color BLACK)\n';
            snippet += '                 (width 80)\n';
            snippet += '                 (height 40)\n';
            snippet += '                 (depth 1)\n';
            snippet += '                )\n';
            snippet += '   )\n';
            snippet += ' \n';
            snippet += ' \n';
            snippet += '   ; Use https://www.base64encode.org/#encodefiles to encode images in base64\n';
            snippet += '   (:image \n';
            snippet += '         (img1 iVBORw0KGgoAAAANSUhEUgAAAXEAAAFxCAIAAAAK5Q/zAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAAXxaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wOC0xMlQxMjoxOTo1MSsxMDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDgtMTVUMjA6MzY6NDgrMTA6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDgtMTVUMjA6MzY6NDgrMTA6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iQWRvYmUgUkdCICgxOTk4KSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MGRmODdjNy1lN2YxLTQ5NmMtYjE1Yy1kYjIzNDAxNDQxZWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ZmJlOWI4NTQtNDJlYy00ODE3LTgxNWQtMzY0YjAxMTRiODQ3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZmJlOWI4NTQtNDJlYy00ODE3LTgxNWQtMzY0YjAxMTRiODQ3Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmYmU5Yjg1NC00MmVjLTQ4MTctODE1ZC0zNjRiMDExNGI4NDciIHN0RXZ0OndoZW49IjIwMTgtMDgtMTJUMTI6MTk6NTErMTA6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MGRmODdjNy1lN2YxLTQ5NmMtYjE1Yy1kYjIzNDAxNDQxZWMiIHN0RXZ0OndoZW49IjIwMTgtMDgtMTVUMjA6MzY6NDgrMTA6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ppcsu5QAAASfSURBVHic7dTBCQAgEMAwdf+dzyUKgiQT9NU9Mwsgcl4HAF/xFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoeQpQ8hSg5ClAyVOAkqcAJU8BSp4ClDwFKHkKUPIUoOQpQMlTgJKnACVPAUqeApQ8BSh5ClDyFKDkKUDJU4CSpwAlTwFKngKUPAUoXWSoBd9t2wfhAAAAAElFTkSuQmCC)\n';
            snippet += '         (img2 iVBORw0KGgoAAAANSUhEUgAAAEoAAABUCAYAAAAlDKGaAAABdklEQVR4Xu3cPU7DQBhF0cnKYGfAzsLO0Efl/IBuEzQox1WKJySOb1yNc1quJHBKK6O1G9TLWuv1cF/Oa63PHe7TblBva633A8x8/gB1KwAqVgEKVBSIM0WBigJxpihQUSDOFAUqCsSZokBFgThTFKgoEGeKAhUF4kxRoKJAnCkKVBSIM0WBigJxpihQUSDOFAUqCsSZokBFgThTFKgoEGeKAhUF4kxRoKJAnCkKVBSIs62LmlO4x5O48X96yGzrU8HXd/EhAv/9j87x6TmiPFiuXwQGSlEhkXtFzZsC88bAs1/z3J5n5vd1D2reFDi+PfCsYBePJFA/ZwAqfkVAgYoCcaYoUFEgzhQFKgrEmaJARYE4UxSoKBBnigIVBeJMUaCiQJwpClQUiDNFgYoCcaYoUFEgzhQFKgrEmaJARYE4UxSoKBBnigIVBeJMUaCiQJwpClQUiDNFgYoCcXZT1PWbC3Mi2Kngq/P3u/2eebzZfzK7KOoLP13HqksMK+sAAAAASUVORK5CYII=)\n';
            snippet += '   )\n';
            snippet += ' )\n';
            window.add_snippet(snippet, "animation");
            
            // add menu item on the top menu
            window.add_menu_button('Planimation', 'planimationMenuItem', 'glyphicon-film', "choosePlanimationFiles('planimation')");
            window.register_file_chooser('planimation',
            {
                showChoice: function() {

                    window.action_type = 'planimation'
                    $('#plannerPlanimationURL').val(window.planimationURL);
                },
                selectChoice: runPlanimation
            });

            if (!(window.planimationSolverStyled)) {
                $('body').append(PLANIMATION_MODEL);
                $('body').append(PLANIMATION_HELP_MODEL);
                
                window.planimationSolverStyled = true;
            }
            
            //Send file to Planimation Unity window when unity load properly
            window.addEventListener("message", function(event) { 
             
                        if (event.origin!= "http://editor.planning.domains"){
                            if (event.data.action==="loadfile"){loadData()}
                        }
                        }, false);

        },

        disable: function() {
            // This is called whenever the plugin is disabled
            window.remove_menu_button('planimationMenuItem');
        },

        save: function() {
            // Used to save the plugin settings for later
            return {planimationURL: window.planimationURL};
        },

        load: function(settings) {
            // Restore the plugin settings from a previous save call
            window.planimationURL = settings['planimationURL'];
        }

    };
});