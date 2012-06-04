<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<h2>Shakespeare's plays</h2>
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="TITLE">
    <xsl:variable name="title" select="." />
    <xsl:value-of select="."/>
    <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
    <a href="javascript:void(0)" onclick="showParts('{$title}')">Parts</a>
    <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
    <a href="javascript:void(0)" onclick="showToc('{$title}');">Contents</a>
    <xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>
    <a href="javascript:void(0)" onclick="showSummary('{$title}');">Summary</a>
    <br />
</xsl:template>

</xsl:transform>
