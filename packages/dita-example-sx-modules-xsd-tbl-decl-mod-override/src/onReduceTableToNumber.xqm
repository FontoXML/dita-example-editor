module namespace app = "http://www.fontoxml.com/app";

declare %public function app:onReduceTableToNumber(
	$previousAccumulator as item()*,
	$relType as xs:string,
	$node as node(),
	$isSourceNode as xs:boolean
) as item()* {
	(: Compute a new accumulator value for $node :)
	if ($relType eq "first") then
		(: First item in the hierarchy :)
		1
	else
		(: Increment the counter :)
		$previousAccumulator + 1
};
