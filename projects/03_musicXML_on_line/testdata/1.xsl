<?xml version="1.0"?>
<xsl:stylesheet version="1.0" 
 xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
  doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" 
  indent="yes"/>
<xsl:template match="/">
 <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
   <title><xsl:value-of select="/course/head/title"/></title>
   <style type="text/css">
   <![CDATA[
    #outline { font-size:larger }
    ul ul {font-size: smaller }
   ]]>
   </style>
  </head>
  <body>
  <h1><xsl:value-of select="/course/head/title"/></h1>
  <div id="courseNum"><xsl:value-of select="/course/head/course_num"/></div>
  <div id="courseLength">
   <xsl:value-of select="/course/head/course_length"/>
  </div>
  <xsl:apply-templates select="/course/body/prerequisites"/>
  <xsl:apply-templates select="/course/body/outline"/>
  </body>
 </html>
</xsl:template>

<xsl:template match="prerequisites">
 <h2>Prerequisites</h2>
 <ul>
 <xsl:for-each select="prereq">
  <li>
   <xsl:value-of select="." />
   <xsl:if test="@optional = 'true'">
    (optional, but recommended)
   </xsl:if>
  </li>
 </xsl:for-each>
 </ul>
</xsl:template>

<xsl:template match="outline">
 <h2>Course Outline</h2>
 <div id="outline">
  <xsl:apply-templates />
 </div>
</xsl:template>

<xsl:template match="topics">
 <ul>
  <xsl:apply-templates />
 </ul>
</xsl:template>

<xsl:template match="title">
 <li><xsl:apply-templates /></li>
</xsl:template>

</xsl:stylesheet>