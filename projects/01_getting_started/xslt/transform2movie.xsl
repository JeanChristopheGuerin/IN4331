<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<h2>Movie</h2>	
	<xsl:apply-templates/>  
</xsl:template>

<xsl:template match="movie">	
	Title: <xsl:value-of select="title"/>  
	<br/>
	Year: <xsl:value-of select="year"/>
	<br/>
	Country: <xsl:value-of select="country"/>
	<br/>
	Genre: <xsl:value-of select="genre"/>
	<br/>
	<br/>
	Directors:
	<table id="table_directors">
		<tr >
			<th>First Name</th>
			<th>Last Name</th>
			<th>Birth Dane</th>
		</tr>		
		<xsl:apply-templates select="director"/>		
	</table>
	<br/>
	Actors:
	<table id="table_actors">
		<tr >
			<th>First Name</th>
			<th>Last Name</th>
			<th>Birth Dane</th>
			<th>Role</th>
		</tr>	
		<xsl:apply-templates select="actor"/>
	</table>
	<br/>
	Summary:
	<p>
		<xsl:value-of select="summary"/>
	</p>
</xsl:template>

<xsl:template match="director">
	<tr>
		<td>
			<xsl:value-of select="first_name"/> 
		</td>
		<td>
			<xsl:value-of select="last_name"/> 
		</td>
		<td>
			<xsl:value-of select="birth_date"/> 
		</td>
	</tr>
</xsl:template>

<xsl:template match="actor">
	<tr>
		<td>
			<xsl:value-of select="first_name"/> 
		</td>
		<td>
			<xsl:value-of select="last_name"/> 
		</td>
		<td>
			<xsl:value-of select="birth_date"/> 
		</td>
		<td>
			<xsl:value-of select="role"/> 
		</td>	
	</tr>
</xsl:template>

</xsl:transform>
