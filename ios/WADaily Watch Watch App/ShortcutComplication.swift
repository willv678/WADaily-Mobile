//
//  ShortcutComplication.swift
//  WADaily WatchKit Extension
//
//  Created by Grant Andrews on 4/27/22.
//

import SwiftUI
import ClockKit

struct ShortcutComplication: View {
    var body: some View {
        VStack{
            Text("1")
                .font(.footnote)
            Image(systemName: "studentdesk")
        }
    }
}

struct ShortcutComplication_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            ShortcutComplication()
            CLKComplicationTemplateGraphicCircularView(
                ShortcutComplication()
            ).previewContext()
        }
    }
}
