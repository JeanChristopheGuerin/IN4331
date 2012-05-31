<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<h2>Movies</h2>
	<table >
		<tr >
			<th>Title</th>
			<th>Year</th>
			<th>Genre</th>
		</tr>		
		<xsl:apply-templates/>		
	</table>  
</xsl:template>

<xsl:template match="movie">
	<tr>
		<xsl:apply-templates select="title"/>  
		<xsl:apply-templates select="year"/>
		<xsl:apply-templates select="genre"/>
	</tr>
</xsl:template>

<xsl:template match="title">
	<td>
		<xsl:value-of select="."/>
	</td>
</xsl:template>

<xsl:template match="year">
	<td>
		<xsl:value-of select="."/>
	</td>
</xsl:template>

<xsl:template match="genre">
	<td>
		<xsl:value-of select="."/>
	</td>
</xsl:template>

</xsl:transform>
