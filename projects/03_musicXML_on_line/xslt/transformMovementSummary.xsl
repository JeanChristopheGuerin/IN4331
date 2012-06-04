<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<h3><center>Summary</center></h3>
    <xsl:apply-templates/>
</xsl:template>

    <xsl:template match="movement/composer">
        <h3>Composer: <xsl:value-of select="." /></h3>
    </xsl:template>

    <xsl:template match="movement/lyricist">
        <h3>Lyricist: <xsl:value-of select="." /></h3>
    </xsl:template>

</xsl:transform>
