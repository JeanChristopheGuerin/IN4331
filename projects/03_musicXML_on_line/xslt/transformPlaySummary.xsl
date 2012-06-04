<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<h3><center>Summary</center></h3>
    <xsl:apply-templates/>
</xsl:template>

    <xsl:template match="SUMMARY/AUTHOR">
        <h3>Author: <xsl:value-of select="." /></h3>
    </xsl:template>

    <xsl:template match="SUMMARY/TITLE">
        <h3>Title: <xsl:value-of select="." /></h3>
        <h3>Personae:</h3>
    </xsl:template>

    <xsl:template match="SUMMARY/PERSONAE/PERSONA">
        <h4><xsl:value-of select="." /></h4>
    </xsl:template>

</xsl:transform>
