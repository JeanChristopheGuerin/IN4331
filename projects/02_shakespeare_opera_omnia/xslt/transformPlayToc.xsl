<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<h4><center>Table of Contents</center></h4>
    <xsl:apply-templates/>
</xsl:template>

    <xsl:template match="ToC/ACT/TITLE">
        <h3><xsl:value-of select="." /></h3>
    </xsl:template>

    <xsl:template match="ToC/ACT/SCENE/TITLE">
        <br />
        <h4><xsl:value-of select="." /></h4>
    </xsl:template>

    <xsl:template match="ToC/ACT/SCENE/ACTOR">
        <h5><xsl:value-of select="." /></h5>
    </xsl:template>


</xsl:transform>
