<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">	
	<xsl:apply-templates/>		
</xsl:template>

<xsl:template match="genre">	
	<option>
		<xsl:attribute name="value">
			<xsl:value-of select="."/>
		</xsl:attribute>
		<xsl:value-of select="."/>
	</option>
</xsl:template>

<xsl:template match="year">	
	<option>
		<xsl:attribute name="value">
			<xsl:value-of select="."/>
		</xsl:attribute>
		<xsl:value-of select="."/>
	</option>
</xsl:template>

</xsl:transform>
