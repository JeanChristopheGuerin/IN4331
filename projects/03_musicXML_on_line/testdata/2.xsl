<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">

        <form id="form_parts" action="javascript:void(0)" accept-charset="utf-8">
            <label form="form_parts" for="select_act">Act</label>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
            <select id="select_act">
                <xsl:apply-templates select="/PLAY/ACTS"/>
            </select>
            <br />

            <label form="form_parts" for="select_scene">Scene</label>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
            <select id="select_scene">
                <xsl:apply-templates select="/PLAY/SCENES"/>
            </select>
            <br/>

            <label form="form_parts" for="select_character">Character</label>
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
            <select id="select_character">
                <xsl:apply-templates select="/PLAY/CHARACTERS"/>
            </select>
            <br/>

            <input id="parts_search" type="submit" value="Search" onClick="searchParts(this.form)" />
        </form>
        <br /><br/>
        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="PLAY/ACTS" name="acts">
        <xsl:for-each select="TITLE">
            <option>
                <xsl:attribute name="value">
                    <xsl:value-of select="."/>
                </xsl:attribute>
                <xsl:value-of select="."/>
            </option>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="PLAY/SCENES">
        <xsl:for-each select="TITLE">
            <option>
                <xsl:attribute name="value">
                    <xsl:value-of select="."/>
                </xsl:attribute>
                <xsl:value-of select="."/>
            </option>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="PLAY/CHARACTERS" name="characters">
        <xsl:for-each select="PERSONA">
            <option>
                <xsl:attribute name="value">
                    <xsl:value-of select="."/>
                </xsl:attribute>
                <xsl:value-of select="."/>
            </option>
        </xsl:for-each>
    </xsl:template>

</xsl:transform>