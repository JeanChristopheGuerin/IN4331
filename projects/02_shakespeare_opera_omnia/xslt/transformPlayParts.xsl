<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <form id="form_parts" action="javascript:void(0)" accept-charset="utf-8">
            <label form="form_parts" for="select_act">Act</label>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
            <select id="select_act">
                <xsl:apply-templates select="*//ACT" />
            </select>
            <br />

            <label form="form_parts" for="select_scene">Scene</label>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
            <select id="select_scene">
                <xsl:apply-templates select="*//SCENE" />
            </select>
            <br/>

            <label form="form_parts" for="select_persona">Persona</label>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
            <select id="select_persona">
                <xsl:apply-templates select="*//CHARACTER" />
            </select>
            <br/>

            <input id="parts_search" type="submit" value="Search" onClick="searchParts(this.form)" />
        </form>
        <br />

    </xsl:template>

    <xsl:template match="PLAY/ACTS/ACT" name="acts">
        <option>
            <xsl:attribute name="value">
                <xsl:value-of select="."/>
            </xsl:attribute>
            <xsl:value-of select="."/>
        </option><br />
    </xsl:template>

    <xsl:template match="PLAY/SCENES/SCENE">
        <option>
            <xsl:attribute name="value">
                <xsl:value-of select="."/>
            </xsl:attribute>
            <xsl:value-of select="."/>
        </option><br />
    </xsl:template>

    <xsl:template match="PLAY/CHARACTERS/CHARACTER" name="characters">
        <option>
            <xsl:attribute name="value">
                <xsl:value-of select="."/>
            </xsl:attribute>
            <xsl:value-of select="."/>
        </option><br />
    </xsl:template>

</xsl:transform>
