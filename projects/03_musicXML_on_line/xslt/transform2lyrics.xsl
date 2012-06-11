<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<h2>Lyrics</h2>
	<p>
		<xsl:apply-templates/>		
	</p>
</xsl:template>

<xsl:template match="lyrics">
	<xsl:apply-templates select="lyric"/>  
</xsl:template>


<xsl:template match="lyric">
	<xsl:value-of select="text"/>
	<xsl:text> </xsl:text>
	<xsl:if test="substring(text, string-length(text)) = '!' or substring(text, string-length(text)) = '.' or substring(text, string-length(text)) = '?' or substring(text, string-length(text)) = ','">
		<br/>
	</xsl:if>
</xsl:template>

</xsl:transform>
