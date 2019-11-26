module namespace app = "http://www.fontoxml.com/app";
 
declare %public function app:onReduceStructureViewItemToNumber(
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
		if ($relType eq "parent") then
			(: No preceding siblings under this parent, append our numbering sub-level :)
			($previousAccumulator, 1)
		else
			(: Increment the counter for our preceding sibling :)
			$previousAccumulator!(if (position() = last()) then .+1 else .)
};