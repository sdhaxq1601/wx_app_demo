Sub SplitText() 'corelDraw 文本 split 两个换行符做隔断
    ' Recorded 2018/9/9
    Dim O As ShapeRange
    Set O = ActiveSelectionRange
    Dim s As Shape, tx() As String, str As String, i As Integer
    Dim s1 As Shape
    Dim gp As Integer, h As Double, top As Double, left As Double
    gp = 5
    h = 0
    If O.Shapes.Count <> 1 Then Exit Sub
    If O.Shapes(1).Type <> cdrTextShape Then Exit Sub
    top = O.Shapes(1).TopY
    left = O.Shapes(1).LeftX
    tx = Split(O.Shapes(1).Text.Story.Text, Chr(13) & Chr(13))
    For i = LBound(tx) To UBound(tx)
    Set s1 = ActiveLayer.CreateArtisticText(left, top, tx(i))
    h = s1.SizeHeight
    s1.TopY = top
    s1.LeftX = left
    top = top - h - gp / 25.4
    Next
End Sub
