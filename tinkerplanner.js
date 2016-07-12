$(function(){
	var latest_version = "2.3.3";
	$.each(version_dictionary, function(key,version){
		$("#version").append("<option value="+key+">"+key+"</option>");
	});
       
        $("#version").val(latest_version);
	var version=latest_version;

	function ddDataSort(a, b) {
		return (a.text == b.text) ? 0 : (a.text<b.text) ? -1 : 1;
	}

	function option(value, text) {
		var option = document.createElement("option");
		option.value = value;
		option.textContent = text;
		return option;
	}
	
	function formatName(string)
	{
		//http://stackoverflow.com/a/1026087 Capitalize the first letter of string in JavaScript
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

        var current_dictionary;

	toSel = document.getElementById("toolSel");
	check = document.getElementById("available");
	reset_version();
	$("#popup_tool_data").click(function(){
		run();
	});
	$("#version").change(function(){
		version = $("#version").val();
		$(".result").dialog("close");
		reset_version();
	});
  	$("#toolSel").change(function(){
		tool = $("#toolSel").val();
		reset_parts();
	});      
        $("#toolMat1,#toolMat2,#toolMat3,#toolMat4").change(function(){
		livestats();
	});   
	$("#close_results").click(function(){
		$(".result").dialog("close");
	});
	
	function reset_version() {
                current_dictionary = version_dictionary[version];
		tools = current_dictionary["tools"];
		$('#toolSel').select2('destroy');

                var real_tools = [];
                $.each(tools, function(tool, value){
			real_tools.push(tool);
		});

                var ddData = [];
		real_tools.forEach(function(tool) {
			ddData.push({text: tool, id: tool});
		});
		ddData.sort(ddDataSort);
                
		function format(d) {
			var tool = d.id;
			return '<div class="tool" id="'+tool+'"><img style="margin: 4px 5px 0 0" src="tools/' + tool + '.png" /><div>' + formatName(tool) + '</div><div class="desc">' + tool + '</div></div>';
		}
		$('#toolSel').select2({
			data: ddData,
			formatResult: format,
                        formatSelection: format,
                        minimumResultsForSearch:-1,
                        width: '220px',
                        allowClear:false,
                        sortResults: function(results, container, query) {
    			return results.sort(function(a, b) {
    				return a.id.localeCompare(b.id);
    			});
        	},
		    matcher: function(search,text) { return text.toUpperCase().indexOf(search.toUpperCase())>=0 || text.toUpperCase().indexOf(search.toUpperCase())>=0; }
		});
		$('#toolSel').select2("val", "pickaxe");
                reset_parts();
	}
        
        function reset_parts() {
            toolSel = document.getElementById("toolSel");
            parts = current_dictionary["tools"][toolSel.value]["parts"];
            materials = current_dictionary["materials"];
            
            var i = 0;
            for (; i < parts.length; i++) { 
                var name = "material" + (i+1);
                var label = document.getElementById(name);
                label.innerHTML = parts[i];
                label.style.display="block";
            }
            if (parts.length === 3) {
                document.getElementById("extra_material").style.display ="none";
            }
            else             {
                document.getElementById("extra_material").style.display ="table-row";
            }
            
            $('#toolMat1,#toolMat2,#toolMat3,#toolMat4').select2('destroy');
            var ddData = [];
            $.each(materials, function(mat, value){
                    ddData.push({text: mat, id: mat});
            });
            ddData.sort(ddDataSort);

            function format(d) {
                    var material = d.id;
                    return '<div class="material" id="'+material+'"><img style="margin: 4px 5px 0 0" src="materials/' + materials[material].icon + '.png" /><div>' + formatName(material) + '</div><div class="desc">' + material + '</div></div>';
            }
            
            $('#toolMat1,#toolMat2,#toolMat3,#toolMat4').select2({
			data: ddData,
			formatResult: format,
                        formatSelection: format,
                        //minimumResultsForSearch:-1,
                        width: '220px',
                        allowClear:false,
                        sortResults: function(results, container, query) {
    			return results.sort(function(a, b) {
    				return a.id.localeCompare(b.id);
    			});
        	},
		    matcher: function(search,text) { return text.toUpperCase().indexOf(search.toUpperCase())>=0 || text.toUpperCase().indexOf(search.toUpperCase())>=0 }
		});
                $('#toolMat1,#toolMat2,#toolMat3,#toolMat4').select2("val", "iron");
                livestats();
        }
        function livestats(){
            tool = current_dictionary["tools"][document.getElementById("toolSel").value];
            materials = current_dictionary["materials"];
            mat1 = materials[$('#toolMat1').select2("val")];
            mat2 = materials[$('#toolMat2').select2("val")];
            mat3 = materials[$('#toolMat3').select2("val")];
            mat4 = materials[$('#toolMat4').select2("val")];
            
            document.getElementById("stat_durability").innerHTML = Math.round(tool.durability(mat1,mat2,mat3,mat4));
            document.getElementById("stat_speed").innerHTML = tool.speed(mat1,mat2,mat3,mat4).toFixed(2);
            document.getElementById("stat_harvest").innerHTML = current_dictionary["harvestlevels"][tool.getHarvestlevel(mat1,mat2,mat3,mat4)];
            document.getElementById("stat_attack").innerHTML = tool.attack(mat1,mat2,mat3,mat4).toFixed(2);
            
            
        }
	function run() {
                tool = current_dictionary["tools"][document.getElementById("toolSel").value];
                materials = current_dictionary["materials"];
		var toolSel = $('#toolSel').select2("val");
                var toolMat1 = $('#toolMat1').select2("val");
               
                parts = tool["parts"];
                mat1 = materials[toolMat1];
                mat2 = materials[$('#toolMat2').select2("val")];
                mat3 = materials[$('#toolMat3').select2("val")];
                mat4 = materials[$('#toolMat4').select2("val")];
                
                var id = "";
                var i=0;
                for (; i < parts.length; i++) {
                    var xx = document.getElementById("toolMat" + (i+1));
                    id += xx.value;
                    id += '_';
                }
                id +=toolSel;
		var title = formatName(tool.getName(toolMat1, $('#toolMat2').select2("val"),$('#toolMat3').select2("val")));

		$('#'+id).remove();
		$("body").append('<ul id="'+id+'" class="partlist result" title="'+title+'">');
		$('#'+id).dialog({
			autoOpen: false,
			modal: false,
			resizable:false,
			width: 250
		});
		$('#'+id).append("<div></div>");

                for (i=0; i < parts.length; i++) {
                    var label = document.getElementById("toolMat" + (i+1)).value;
                    $('#'+id).append('<li class="tool_result tool" id="' + tool.parts[i] + '"><img src="materials/' + current_dictionary["materials"][label].icon + '.png" /><div>' + formatName(label) + '</div><div class="desc">' + parts[i] + '</div></li>');
                
                }
                $('#'+id).append('</ul>');
		//$('#'+id).children().last().remove();
		$('#'+id).append('<li id="stats_title">Stats</li>');

                var rtable = '<table>';
                rtable = $(rtable).append('<tr><td><div class="stat_item">Durability:</div></td><td><div id="stat_durability">' +Math.round(tool.durability(mat1,mat2,mat3,mat4))+'</div></td></tr>');
                rtable = $(rtable).append('<tr><td><div class="stat_item">Harvest Level:</div></td><td><div id="stat_harvest">'+current_dictionary["harvestlevels"][tool.getHarvestlevel(mat1,mat2,mat3,mat4)]+'</div></td></tr>');
                rtable = $(rtable).append('<tr><td><div class="stat_item">Speed:</div></td><td><div id="stat_speed">'+tool.speed(mat1,mat2,mat3,mat4).toFixed(2)+'</div></td></tr>');
                rtable = $(rtable).append('<tr><td><div class="stat_item">Attack:</div></td><td><div id="stat_attack">'+tool.attack(mat1,mat2,mat3,mat4).toFixed(2)+'</div></td></tr>');
                rtable = $(rtable).append('</table>');
                $('#'+id).append(rtable);
		var used = '<ul id="stats_list">';
		used = $(used).append('<li>Durability: '+ Math.round(tool.durability(mat1,mat2,mat3,mat4)) +'</li>');
                used = $(used).append('<li>Harvest level: '+ current_dictionary["harvestlevels"][tool.getHarvestlevel(mat1,mat2,mat3,mat4)] +'</li>');
                used = $(used).append('<li>Speed: '+ tool.speed(mat1,mat2,mat3,mat4).toFixed(2) +'</li>');
                used = $(used).append('<li>Attack: '+ tool.attack(mat1,mat2,mat3,mat4).toFixed(2) +'</li>');
		used = $(used).append('</ul>');
		//$('#'+id).append(used);
		$('#'+id).dialog("open");
	}
});
