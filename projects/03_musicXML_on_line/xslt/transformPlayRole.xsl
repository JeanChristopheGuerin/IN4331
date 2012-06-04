<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
    <xsl:apply-templates/>
</xsl:template>

    <xsl:template match="ROLE/ACT">
        <h3><xsl:value-of select="." /></h3>
    </xsl:template>

    <xsl:template match="ROLE/SCENE">
        <h3><xsl:value-of select="." /></h3>
    </xsl:template>

    <xsl:template match="ROLE/SPEAKER">
        <h3>ROLE OF <xsl:value-of select="." /></h3>
    </xsl:template>

    <xsl:template match="ROLE/LINE">
        <h4><xsl:value-of select="." /></h4>
    </xsl:template>

</xsl:transform>
