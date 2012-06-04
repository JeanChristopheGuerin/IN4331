<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <h2>Classical movements</h2>
        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="movement">
        <br />
        <xsl:variable name="title" select="title" />
        <a href="javascript:void(0)" onclick="showSummary('{$title}')"><xsl:value-of select="title"/></a>
        (<xsl:value-of select="composer"/>)
        <!--<xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>-->
        <!--<a href="javascript:void(0)" onclick="showParts('{$title}')">Parts</a>-->
        <!--<xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>-->
        <!--<a href="javascript:void(0)" onclick="showToc('{$title}');">Contents</a>-->
        <!--<xsl:text disable-output-escaping="yes">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</xsl:text>-->
        <!--<a href="javascript:void(0)" onclick="showSummary('{$title}');">Summary</a>-->
    </xsl:template>


</xsl:transform>
