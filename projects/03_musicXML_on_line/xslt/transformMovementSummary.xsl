<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="/">
		<h2>Summary</h2>
		<xsl:apply-templates/>
	</xsl:template>
	
	<xsl:template match="movement/title">
		Title: <xsl:value-of select="." /> <br/>
	</xsl:template>

	<xsl:template match="movement/composer">
		Composer: <xsl:value-of select="." /> <br/>
	</xsl:template>

	<xsl:template match="movement/lyricist">
		Lyricist: <xsl:value-of select="." /> <br/>
	</xsl:template>

</xsl:transform>
