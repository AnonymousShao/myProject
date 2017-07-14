function getFragments(fn) {
	$("[fragment]").each(function() {
		var url = $(this).attr("fragment");
			//alert(url);
		$(this).load(url,function(){fn&&fn()});
	});
}